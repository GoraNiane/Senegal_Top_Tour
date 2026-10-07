import prisma from '../prisma.js';
import { CreateExcursionInput, UpdateExcursionInput } from '../validators/excursionValidator.js';

const parseJsonField = (field: any, defaultValue: any) => {
  if (!field) return defaultValue;
  if (typeof field === 'object') return field;
  try {
    return JSON.parse(field);
  } catch {
    return defaultValue;
  }
};

const formatExcursionResponse = (exc: any) => {
  return {
    ...exc,
    inclusions: parseJsonField(exc.inclusions, []),
    exclusions: parseJsonField(exc.exclusions, []),
    practicalInfo: parseJsonField(exc.practicalInfo, {}),
    isUpcoming: exc.status === 'UPCOMING',
    statusLabel: exc.status === 'UPCOMING' ? 'Bientôt disponible' : exc.status,
  };
};

export const getPublicExcursions = async (query?: {
  category?: string;
  durationCategory?: string;
  destinationSlug?: string;
}) => {
  const whereClause: any = {
    // Fundamental publication rule: Only PUBLISHED and UPCOMING are visible to the public
    status: {
      in: ['PUBLISHED', 'UPCOMING'],
    },
  };

  if (query?.category && query.category !== 'Toutes') {
    whereClause.category = {
      equals: query.category,
    };
  }

  if (query?.durationCategory && query.durationCategory !== 'all') {
    whereClause.durationCategory = query.durationCategory;
  }

  if (query?.destinationSlug) {
    whereClause.destination = {
      slug: query.destinationSlug,
    };
  }

  const excursions = await prisma.excursion.findMany({
    where: whereClause,
    orderBy: {
      order: 'asc',
    },
    include: {
      destination: {
        select: {
          id: true,
          name: true,
          slug: true,
          region: true,
        },
      },
      images: {
        orderBy: {
          order: 'asc',
        },
      },
      itinerary: {
        orderBy: {
          order: 'asc',
        },
      },
    },
  });

  return excursions.map(formatExcursionResponse);
};

export const getPublicExcursionBySlug = async (slug: string) => {
  const excursion = await prisma.excursion.findFirst({
    where: {
      slug: slug.toLowerCase(),
      status: {
        in: ['PUBLISHED', 'UPCOMING'],
      },
    },
    include: {
      destination: true,
      images: {
        orderBy: {
          order: 'asc',
        },
      },
      itinerary: {
        orderBy: {
          order: 'asc',
        },
      },
    },
  });

  if (!excursion) {
    throw { status: 404, message: 'Excursion introuvable ou non publiée' };
  }

  // Get similar excursions (same category or general recommendations)
  const related = await prisma.excursion.findMany({
    where: {
      id: { not: excursion.id },
      status: { in: ['PUBLISHED', 'UPCOMING'] },
    },
    take: 3,
    include: {
      images: true,
      destination: true,
    },
  });

  return {
    ...formatExcursionResponse(excursion),
    related: related.map(formatExcursionResponse),
  };
};

export const getAllExcursionsAdmin = async () => {
  const excursions = await prisma.excursion.findMany({
    orderBy: {
      order: 'asc',
    },
    include: {
      destination: true,
      images: true,
      itinerary: true,
    },
  });

  return excursions.map(formatExcursionResponse);
};

export const createExcursion = async (data: CreateExcursionInput) => {
  const existing = await prisma.excursion.findUnique({
    where: { slug: data.slug.toLowerCase() },
  });

  if (existing) {
    throw { status: 409, message: `Une excursion avec le slug '${data.slug}' existe déjà.` };
  }

  const inclusionsStr = Array.isArray(data.inclusions)
    ? JSON.stringify(data.inclusions)
    : data.inclusions || '[]';

  const exclusionsStr = Array.isArray(data.exclusions)
    ? JSON.stringify(data.exclusions)
    : data.exclusions || '[]';

  const practicalInfoStr =
    typeof data.practicalInfo === 'object'
      ? JSON.stringify(data.practicalInfo)
      : data.practicalInfo || '{}';

  return await prisma.excursion.create({
    data: {
      name: data.name,
      slug: data.slug.toLowerCase(),
      subtitle: data.shortDescription || data.subtitle || data.name,
      description: data.description,
      fullContent: data.fullContent || data.description,
      duration: data.duration,
      durationCategory: data.durationCategory || 'half_day',
      departTime: data.schedule || data.departTime,
      returnTime: data.returnTime,
      departureCity: data.departureLocation || data.departureCity || 'Dakar',
      priceType: data.price ? 'fixed' : 'on_demand',
      priceAmount: data.price || null,
      currency: data.currency || 'EUR',
      priceNote: data.priceNote || 'Prix sur demande',
      inclusions: inclusionsStr,
      exclusions: exclusionsStr,
      practicalInfo: practicalInfoStr,
      category: data.category || 'Culture',
      destinationId: data.destinationId || null,
      status: data.status || 'PUBLISHED',
      isFeatured: data.featured || false,
      isPopular: data.isPopular || false,
      order: data.displayOrder || 0,
      images: data.images && data.images.length > 0 ? {
        create: data.images.map((img, idx) => ({
          url: img.url,
          caption: img.caption,
          isCover: img.isCover || idx === 0,
          order: img.order || idx,
        })),
      } : undefined,
      itinerary: data.itinerary && data.itinerary.length > 0 ? {
        create: data.itinerary.map((step, idx) => ({
          time: step.time || '',
          title: step.title,
          description: step.description,
          order: step.order || idx,
        })),
      } : undefined,
    },
    include: {
      images: true,
      itinerary: true,
      destination: true,
    },
  });
};

export const updateExcursion = async (id: string, data: UpdateExcursionInput) => {
  const existing = await prisma.excursion.findUnique({
    where: { id },
  });

  if (!existing) {
    throw { status: 404, message: 'Excursion introuvable' };
  }

  const updateData: any = { ...data };

  if (data.inclusions) {
    updateData.inclusions = Array.isArray(data.inclusions)
      ? JSON.stringify(data.inclusions)
      : data.inclusions;
  }
  if (data.exclusions) {
    updateData.exclusions = Array.isArray(data.exclusions)
      ? JSON.stringify(data.exclusions)
      : data.exclusions;
  }
  if (data.practicalInfo) {
    updateData.practicalInfo = typeof data.practicalInfo === 'object'
      ? JSON.stringify(data.practicalInfo)
      : data.practicalInfo;
  }
  if (data.shortDescription) {
    updateData.subtitle = data.shortDescription;
    delete updateData.shortDescription;
  }
  if (data.departureLocation) {
    updateData.departureCity = data.departureLocation;
    delete updateData.departureLocation;
  }
  if (data.price !== undefined) {
    updateData.priceAmount = data.price;
    updateData.priceType = data.price ? 'fixed' : 'on_demand';
    delete updateData.price;
  }
  if (data.featured !== undefined) {
    updateData.isFeatured = data.featured;
    delete updateData.featured;
  }
  if (data.displayOrder !== undefined) {
    updateData.order = data.displayOrder;
    delete updateData.displayOrder;
  }

  // Handle nested images / itinerary separately if needed
  delete updateData.images;
  delete updateData.itinerary;

  return await prisma.excursion.update({
    where: { id },
    data: updateData,
    include: {
      images: true,
      itinerary: true,
      destination: true,
    },
  });
};

export const deleteExcursion = async (id: string) => {
  const existing = await prisma.excursion.findUnique({
    where: { id },
  });

  if (!existing) {
    throw { status: 404, message: 'Excursion introuvable' };
  }

  await prisma.excursion.delete({
    where: { id },
  });

  return { id };
};
