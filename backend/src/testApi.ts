import prisma from './prisma.js';

const BASE_URL = process.env.API_BASE_URL || 'http://localhost:5000/api';

const results: { name: string; passed: boolean; details?: string }[] = [];

function assert(condition: boolean, testName: string, failureDetails?: string) {
  if (condition) {
    console.log(`  ✅ PASS: ${testName}`);
    results.push({ name: testName, passed: true });
  } else {
    console.error(`  ❌ FAIL: ${testName} - ${failureDetails || 'Assertion failed'}`);
    results.push({ name: testName, passed: false, details: failureDetails });
  }
}

export async function runAllTests() {
  console.log('\n======================================================');
  console.log('🧪 SENEGAL TOP TOUR — API TEST SUITE (MODULE 7/8)');
  console.log(`🌐 Base URL: ${BASE_URL}`);
  console.log('======================================================\n');

  let adminToken = '';
  let createdExcursionId = '';
  let draftExcursionId = '';
  let testReservationId = '';

  // 1. HEALTH CHECK
  console.log('📌 1. Health Check Endpoint');
  try {
    const res = await fetch(`${BASE_URL}/health`);
    const data: any = await res.json();
    assert(res.status === 200 && data.status === 'ok', 'GET /api/health should return 200 and status ok');
  } catch (err: any) {
    assert(false, 'GET /api/health should respond', err.message);
  }

  // 2. AUTHENTICATION (LOGIN)
  console.log('\n📌 2. Authentication Tests (Section 8 & 16)');
  try {
    // 2.1 Invalid login
    const invalidRes = await fetch(`${BASE_URL}/auth/login`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ email: 'admin@senegaltoptour.com', password: 'wrongpassword' }),
    });
    assert(invalidRes.status === 401, 'POST /api/auth/login with wrong password returns 401 Unauthorized');

    // 2.2 Valid login
    const loginRes = await fetch(`${BASE_URL}/auth/login`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ email: 'admin@senegaltoptour.com', password: '2004' }),
    });
    const loginData: any = await loginRes.json();
    assert(loginRes.status === 200 && !!loginData.data?.token, 'POST /api/auth/login returns 200 with JWT token');
    assert(!loginData.data?.user?.passwordHash, 'Security: passwordHash is NEVER exposed in login response');
    adminToken = loginData.data?.token;

    // 2.3 Check profile with token
    const meRes = await fetch(`${BASE_URL}/auth/me`, {
      headers: { Authorization: `Bearer ${adminToken}` },
    });
    const meData: any = await meRes.json();
    assert(meRes.status === 200 && meData.data?.email === 'admin@senegaltoptour.com', 'GET /api/auth/me returns authenticated admin profile');
  } catch (err: any) {
    assert(false, 'Auth flow failed', err.message);
  }

  // 3. EXCURSION CREATION (ADMIN)
  console.log('\n📌 3. Excursion Creation (Section 10 & 16)');
  try {
    const newExcursionPayload = {
      name: 'Excursion Test Automatisé Dakar',
      slug: 'excursion-test-auto-dakar',
      shortDescription: 'Circuit test pour validation backend',
      description: 'Description détaillée du circuit test pour la validation automatique.',
      duration: '½ Journée',
      durationCategory: 'half_day',
      departureLocation: 'Dakar',
      price: 45,
      currency: 'EUR',
      category: 'Culture',
      status: 'PUBLISHED',
      featured: true,
      displayOrder: 99,
      included: ['Transport privatisé', 'Guide officiel'],
      excluded: ['Dépenses personnelles'],
      practicalInfo: { Tenue: 'Confortable' },
      images: [{ url: '/images/dakar.png', caption: 'Vue Test', isCover: true }],
      itinerary: [{ time: '09h00', title: 'Départ test', description: 'Début du tour test' }],
    };

    // 3.1 Without token (should fail)
    const unauthorizedRes = await fetch(`${BASE_URL}/admin/excursions`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(newExcursionPayload),
    });
    assert(unauthorizedRes.status === 401, 'POST /api/admin/excursions without token returns 401 Unauthorized');

    // 3.2 With admin token
    const createRes = await fetch(`${BASE_URL}/admin/excursions`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${adminToken}`,
      },
      body: JSON.stringify(newExcursionPayload),
    });
    const createData: any = await createRes.json();
    assert(createRes.status === 201 && !!createData.data?.id, 'POST /api/admin/excursions creates excursion (201 Created)');
    createdExcursionId = createData.data?.id;
  } catch (err: any) {
    assert(false, 'Excursion creation failed', err.message);
  }

  // 4. EXCURSION MODIFICATION (ADMIN)
  console.log('\n📌 4. Excursion Modification (Section 10 & 16)');
  try {
    const updateRes = await fetch(`${BASE_URL}/admin/excursions/${createdExcursionId}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${adminToken}`,
      },
      body: JSON.stringify({
        name: 'Excursion Test Dakar (Modifiée)',
        shortDescription: 'Description mise à jour avec succès',
        price: 55,
      }),
    });
    const updateData: any = await updateRes.json();
    assert(
      updateRes.status === 200 && updateData.data?.name === 'Excursion Test Dakar (Modifiée)',
      'PUT /api/admin/excursions/:id updates excursion details'
    );
  } catch (err: any) {
    assert(false, 'Excursion modification failed', err.message);
  }

  // 5. PUBLICATION STATUS & VISIBILITY RULES (Section 11 & 16)
  console.log('\n📌 5. Publication Rules (Section 11: DRAFT, UPCOMING, PUBLISHED, ARCHIVED)');
  try {
    // 5.1 Create a DRAFT excursion
    const draftPayload = {
      name: 'Circuit Secret Non Publié',
      slug: 'circuit-secret-draft',
      shortDescription: 'Ce circuit doit rester invisible du public',
      description: 'Description secrète.',
      duration: '1 Journée',
      category: 'Aventure',
      status: 'DRAFT',
    };
    const draftCreateRes = await fetch(`${BASE_URL}/admin/excursions`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${adminToken}`,
      },
      body: JSON.stringify(draftPayload),
    });
    const draftCreateData: any = await draftCreateRes.json();
    draftExcursionId = draftCreateData.data?.id;

    // 5.2 Verify DRAFT is NOT visible in public GET /api/excursions
    const publicListRes = await fetch(`${BASE_URL}/excursions`);
    const publicListData: any = await publicListRes.json();
    const isDraftInPublic = publicListData.data?.some((exc: any) => exc.slug === 'circuit-secret-draft');
    assert(!isDraftInPublic, 'Rule 11: DRAFT excursions are strictly INVISIBLE in public /api/excursions');

    // 5.3 Verify DRAFT returns 404 on public /api/excursions/:slug
    const publicDetailRes = await fetch(`${BASE_URL}/excursions/circuit-secret-draft`);
    assert(publicDetailRes.status === 404, 'Rule 11: Direct public access to DRAFT slug returns 404 Not Found');

    // 5.4 Verify admin CAN see DRAFT in /api/admin/excursions
    const adminListRes = await fetch(`${BASE_URL}/admin/excursions`, {
      headers: { Authorization: `Bearer ${adminToken}` },
    });
    const adminListData: any = await adminListRes.json();
    const isDraftInAdmin = adminListData.data?.some((exc: any) => exc.slug === 'circuit-secret-draft');
    assert(isDraftInAdmin, 'Admin can view all excursions including DRAFT in /api/admin/excursions');

    // 5.5 Verify Destinations publication rule (6 PUBLISHED visible, 7 DRAFT hidden)
    const publicDestRes = await fetch(`${BASE_URL}/destinations`);
    const publicDestData: any = await publicDestRes.json();
    const publicDestSlugs = publicDestData.data?.map((d: any) => d.slug);
    const draftDestFound = publicDestSlugs.includes('saint-louis') || publicDestSlugs.includes('djoudj');
    assert(!draftDestFound, 'Rule 11 & 12: DRAFT destinations (Saint-Louis, Djoudj) are hidden from public API');
    assert(publicDestSlugs.includes('dakar') && publicDestSlugs.includes('goree'), 'Rule 12: PUBLISHED destinations (Dakar, Gorée) are public');
  } catch (err: any) {
    assert(false, 'Publication rules test failed', err.message);
  }

  // 6. EXCURSION DELETION (ADMIN)
  console.log('\n📌 6. Excursion Deletion (Section 10 & 16)');
  try {
    // Delete created test excursions
    if (createdExcursionId) {
      const delRes1 = await fetch(`${BASE_URL}/admin/excursions/${createdExcursionId}`, {
        method: 'DELETE',
        headers: { Authorization: `Bearer ${adminToken}` },
      });
      assert(delRes1.status === 200, 'DELETE /api/admin/excursions/:id deletes excursion (200 OK)');
    }

    if (draftExcursionId) {
      await fetch(`${BASE_URL}/admin/excursions/${draftExcursionId}`, {
        method: 'DELETE',
        headers: { Authorization: `Bearer ${adminToken}` },
      });
    }
  } catch (err: any) {
    assert(false, 'Excursion deletion failed', err.message);
  }

  // 7. RESERVATION SUBMISSION & MANAGEMENT (Section 7, 9, 10, 16)
  console.log('\n📌 7. Reservation Submission & Management');
  try {
    // 7.1 Invalid reservation (missing required fields)
    const invalidRes = await fetch(`${BASE_URL}/reservations`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ fullName: 'A' }),
    });
    assert(invalidRes.status === 400, 'POST /api/reservations with invalid data returns 400 Bad Request');

    // 7.2 Valid reservation
    const validBookingPayload = {
      fullName: 'Goran Touriste Test',
      email: 'test.traveler@example.com',
      phone: '+33612345678',
      travelerCount: 2,
      requestedDate: '2026-11-15',
      destination: 'Dakar',
      excursion: 'Tour de Ville Dakar',
      duration: '½ Journée',
      message: 'Demande de réservation de test avec guide francophone.',
    };

    const bookRes = await fetch(`${BASE_URL}/reservations`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(validBookingPayload),
    });
    const bookData: any = await bookRes.json();
    assert(bookRes.status === 201 && !!bookData.data?.refNumber, 'POST /api/reservations creates reservation with unique refNumber');
    testReservationId = bookData.data?.id;

    // 7.3 Admin update reservation status
    if (testReservationId) {
      const updateStatusRes = await fetch(`${BASE_URL}/admin/reservations/${testReservationId}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${adminToken}`,
        },
        body: JSON.stringify({ status: 'CONFIRMED' }),
      });
      const updateStatusData: any = await updateStatusRes.json();
      assert(updateStatusRes.status === 200 && updateStatusData.data?.status === 'CONFIRMED', 'PUT /api/admin/reservations/:id updates status to CONFIRMED');
    }
  } catch (err: any) {
    assert(false, 'Reservation flow failed', err.message);
  }

  // 8. CONTACT FORM SUBMISSION (Section 9 & 16)
  console.log('\n📌 8. Contact Form Submission');
  try {
    const contactPayload = {
      fullName: 'Awa Diop',
      email: 'awa.diop@example.sn',
      phone: '+221770000000',
      subject: 'Demande d’information voyage sur-mesure',
      message: 'Bonjour, je souhaite des informations pour organiser un séjour d’entreprise au Sénégal.',
    };

    const contactRes = await fetch(`${BASE_URL}/contact`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(contactPayload),
    });
    const contactData: any = await contactRes.json();
    assert(contactRes.status === 201 && contactData.success === true, 'POST /api/contact submits contact message (201 Created)');
  } catch (err: any) {
    assert(false, 'Contact form test failed', err.message);
  }

  // 9. NEWSLETTER SUBSCRIPTION (Section 9 & 16)
  console.log('\n📌 9. Newsletter Subscription');
  try {
    // 9.1 Invalid email
    const invalidEmailRes = await fetch(`${BASE_URL}/newsletter`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ email: 'invalid-email-string' }),
    });
    assert(invalidEmailRes.status === 400, 'POST /api/newsletter with invalid email returns 400 Bad Request');

    // 9.2 Valid email
    const newsletterRes = await fetch(`${BASE_URL}/newsletter`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ email: `newsletter-${Date.now()}@senegaltoptour.com` }),
    });
    const newsletterData: any = await newsletterRes.json();
    assert(newsletterRes.status === 201 && newsletterData.success === true, 'POST /api/newsletter subscribes email (201 Created)');
  } catch (err: any) {
    assert(false, 'Newsletter test failed', err.message);
  }

  // SUMMARY
  const total = results.length;
  const passed = results.filter((r) => r.passed).length;
  const failed = total - passed;

  console.log('\n======================================================');
  console.log(`📊 TEST SUITE SUMMARY: ${passed}/${total} PASSED (${failed} failed)`);
  console.log('======================================================\n');

  if (failed > 0) {
    console.error('❌ Some tests failed. Please inspect logs above.');
    process.exit(1);
  } else {
    console.log('🎉 ALL BACKEND TESTS PASSED WITH 100% SUCCESS!');
  }
}

// Auto-run
runAllTests()
  .catch((err) => {
    console.error('Fatal test error:', err);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
