import prisma from '../prisma.js';
import { CreateDestinationInput, UpdateDestinationInput } from '../validators/destinationValidator.js';

export const getPublicDestinations = async () => {
  // Publicly visible rule: PUBLISHED or UPCOMING (DRAFT and ARCHIVED are strictly excluded)
  return await prisma.destination.findMany({
    where: {
      status: {
        in: ['PUBLISHED', 'UPCOMING'],
      },
    },
    orderBy: {
      order: 'asc',
    },
    include: {
      _count: {
        select: {
          excursions: {
            where: {
              status: { in: ['PUBLISHED', 'UPCOMING'] },
            },
          },
        },
      },
    },
  });
};

export const getPublicDestinationBySlug = async (slug: string) => {
  const destination = await prisma.destination.findFirst({
    where: {
      slug: slug.toLowerCase(),
      status: {
        in: ['PUBLISHED', 'UPCOMING'],
      },
    },
    include: {
      excursions: {
        where: {
          status: { in: ['PUBLISHED', 'UPCOMING'] },
        },
        include: {
          images: true,
        },
      },
    },
  });

  if (!destination) {
    throw { status: 404, message: 'Destination introuvable ou non publiée' };
  }

  return destination;
};

export const getAllDestinationsAdmin = async () => {
  return await prisma.destination.findMany({
    orderBy: {
      order: 'asc',
    },
    include: {
      _count: {
        select: { excursions: true },
      },
    },
  });
};

export const createDestination = async (data: CreateDestinationInput) => {
  const existing = await prisma.destination.findUnique({
    where: { slug: data.slug.toLowerCase() },
  });

  if (existing) {
    throw { status: 409, message: `Une destination avec le slug '${data.slug}' existe déjà.` };
  }

  const highlightsString = Array.isArray(data.highlights)
    ? JSON.stringify(data.highlights)
    : data.highlights || '[]';

  return await prisma.destination.create({
    data: {
      name: data.name,
      slug: data.slug.toLowerCase(),
      subtitle: data.subtitle || data.name,
      description: data.description,
      region: data.region || 'Sénégal',
      highlights: highlightsString,
      imageUrl: data.imageUrl,
      category: data.category || 'Culture',
      status: data.status || 'PUBLISHED',
      isFeatured: data.featured || false,
      order: data.displayOrder || 0,
    },
  });
};

export const updateDestination = async (id: string, data: UpdateDestinationInput) => {
  const existing = await prisma.destination.findUnique({
    where: { id },
  });

  if (!existing) {
    throw { status: 404, message: 'Destination introuvable' };
  }

  const updatePayload: any = { ...data };
  if (data.highlights && Array.isArray(data.highlights)) {
    updatePayload.highlights = JSON.stringify(data.highlights);
  }
  if (data.slug) {
    updatePayload.slug = data.slug.toLowerCase();
  }
  if (data.featured !== undefined) {
    updatePayload.isFeatured = data.featured;
    delete updatePayload.featured;
  }
  if (data.displayOrder !== undefined) {
    updatePayload.order = data.displayOrder;
    delete updatePayload.displayOrder;
  }

  return await prisma.destination.update({
    where: { id },
    data: updatePayload,
  });
};

export const deleteDestination = async (id: string) => {
  const existing = await prisma.destination.findUnique({
    where: { id },
  });

  if (!existing) {
    throw { status: 404, message: 'Destination introuvable' };
  }

  await prisma.destination.delete({
    where: { id },
  });

  return { id };
};
