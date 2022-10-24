export enum CREDENTIALS {
  LSBC_TEST = 'AuJrigKQGRLJajKAebTgWu:2:Member Card:1.5.1',
  LSBC_PROD = '4xE68b6S5VRFrKMMG1U95M:2:Member Card:1.5.1',
  SHOWCASE_LAWYER_DEV = 'Trx3R1frdEzbn34Sp1jyX:2:Member Card:1.5.1',
  SHOWCASE_LAWYER_TEST = '63ZiwyeZeazA6AhYRYm2zD:2:Member Card:1.5.1',
  SHOWCASE_LAWYER_PROD = 'XUxBrVSALWHLeycAUhrNr9:2:Member Card:1.5.1',
  SHOWCASE_STUDENT_DEV = 'Trx3R1frdEzbn34Sp1jyX:2:student_card:1.0',
  SHOWCASE_STUDENT_TEST = '63ZiwyeZeazA6AhYRYm2zD:2:student_card:1.0',
  SHOWCASE_STUDENT_PROD = 'XUxBrVSALWHLeycAUhrNr9:2:student_card:1.0',
  UNVERIFIED_PERSON_DEV = 'Ui6HA36FvN83cEtmYYHxrn:2:unverified_person:0.1.0',
  UNVERIFIED_PERSON_TEST = 'XZQpyaFa9hBUdJXfKHUvVg:2:unverified_person:0.1.0',
  UNVERIFIED_PERSON_PROD = '9wVuYYDEDtpZ6CYMqSiWop:2:unverified_person:0.1.0',
  PILOT_INVITE_DEV = '',
  PILOT_INVITE_TEST = '3Lbd5wSSSBv1xtjwsQ36sj:2:BC VC Pilot Certificate:1.0.1',
  PILOT_INVITE_PROD = '',
  BC_DIGITAL_ID_QA = 'KCxVC8GkKywjhWJnUfCmkW:3:CL:20:Person (QA)',
  BC_DIGITAL_ID_SIT = '7xjfawcnyTUcduWVysLww5:3:CL:28075:Person (SIT)',
}

const demoMemberCardOverlay = {
  imageSource: require('./lsbc-member-card-demo.png'),
  header: {
    imageSource: require('./lsbc-header-logo.png'),
    backgroundColor: '#00698C',
    hideIssuer: true,
  },
}

const memberCardOverlay = {
  imageSource: require('./lsbc-member-card.png'),
  header: {
    imageSource: require('./lsbc-header-logo.png'),
    backgroundColor: '#00698C',
    hideIssuer: true,
  },
}

const studentCardOverlay = {
  imageSource: require('./best-bc-student-card.png'),
  header: {
    imageSource: require('./best-bc-header-logo.png'),
    color: '#FFFFFF',
  },
  footer: { color: '#FFFFFF' },
}

const idCardOverlay = {
  imageSource: require('./service-bc-id-card.png'),
  header: {
    imageSource: require('./service-bc-header-logo.png'),
    color: '#FFFFFF',
  },
  footer: { color: '#FFFFFF' },
}

const digitalIdInvitationCardOverlay = {
  imageSource: require('./invitation-card.png'),
  header: {
    imageSource: require('./service-bc-header-logo.png'),
    hideIssuer: true,
    color: '#FFFFFF',
    mapping: {
      credentialLabel: 'BC Digital ID Invitation',
    },
    footer: { color: '#FFFFFF' },
  },
}

const digitalIdCardOverlay = {
  imageSource: require('./service-bc-id-card.png'),
  header: {
    imageSource: require('./service-bc-header-logo.png'),
    color: '#FFFFFF',
    mapping: {
      connectionLabel: 'Service BC',
      credentialLabel: 'Person',
    },
  },
  footer: { color: '#FFFFFF' },
}

const unverifiedPersonCardBundle = {
  capture_base: {},
  overlays: [
    {
      type: 'spec/overlays/meta/1.0',
      language: 'en',
      name: 'Unverified Person',
      issuerName: 'BC Digital Idenity & Trust Program',
    },
    {
      type: 'spec/overlays/meta/1.0',
      language: 'fr',
      name: 'Unverified Personne',
      issuerName: 'BC Digital Idenity & Trust Program',
    },
    {
      type: 'spec/overlays/card_layout/1.0',
      ...idCardOverlay,
    },
    {
      type: 'spec/overlays/label/1.0',
      language: 'en',
      attr_labels: {
        given_names: 'Given Name',
        family_name: 'Family Name',
      },
    },
    {
      type: 'spec/overlays/label/1.0',
      language: 'fr',
      attr_labels: {
        given_names: 'Prénoms',
        family_name: 'Nom de famille',
      },
    },
  ],
}

const digitalIdCardBundle = {
  capture_base: {},
  overlays: [
    {
      type: 'spec/overlays/meta/1.0',
      language: 'en',
      name: 'Person',
      issuerName: 'Service BC',
    },
    {
      type: 'spec/overlays/meta/1.0',
      language: 'fr',
      name: 'Personne',
      issuerName: 'Service BC',
    },
    {
      type: 'spec/overlays/card_layout/1.0',
      ...digitalIdCardOverlay,
    },
    {
      type: 'spec/overlays/label/1.0',
      language: 'en',
      attr_labels: {
        given_names: 'Given Name',
        family_name: 'Family Name',
      },
    },
    {
      type: 'spec/overlays/label/1.0',
      language: 'fr',
      attr_labels: {
        given_names: 'Prénoms',
        family_name: 'Nom de famille',
      },
    },
  ],
}

const demoMemberCardBundle = {
  capture_base: {},
  overlays: [
    {
      type: 'spec/overlays/meta/1.0',
      language: 'en',
      name: 'Person',
      issuerName: 'Law Society of BC',
    },
    {
      type: 'spec/overlays/card_layout/1.0',
      ...demoMemberCardOverlay,
    },
    {
      type: 'spec/overlays/label/1.0',
      language: 'en',
      attr_labels: {
        given_names: 'Given Name',
        family_name: 'Family Name',
      },
    },
  ],
}

const memberCardBundle = {
  capture_base: {},
  overlays: [
    {
      type: 'spec/overlays/meta/1.0',
      language: 'en',
      name: 'Member',
      issuerName: 'Law Society of BC',
    },
    {
      type: 'spec/overlays/card_layout/1.0',
      ...memberCardOverlay,
    },
  ],
}

const studentCardBundle = {
  capture_base: {},
  overlays: [
    {
      type: 'spec/overlays/meta/1.0',
      language: 'en',
      name: 'Student',
      issuerName: 'BestBC College',
    },
    {
      type: 'spec/overlays/card_layout/1.0',
      ...studentCardOverlay,
    },
  ],
}

const digitalIdInvitationCardBundle = {
  capture_base: {},
  overlays: [
    {
      type: 'spec/overlays/meta/1.0',
      language: 'en',
      name: 'Pilot Invitation',
      issuerName: 'DITP',
    },
    {
      type: 'spec/overlays/card_layout/1.0',
      ...digitalIdInvitationCardOverlay,
    },
  ],
}

export default {
  // ↓↓↓ https://github.com/bcgov/bc-wallet-mobile/discussions/370
  /* LSBC (TEST) */
  [CREDENTIALS.LSBC_TEST]: demoMemberCardBundle,
  [CREDENTIALS.LSBC_PROD]: memberCardBundle /* LSBC (PROD) */,
  // ↓↓↓ https://github.com/bcgov/BC-Wallet-Demo/discussions/59
  [CREDENTIALS.SHOWCASE_LAWYER_DEV]: demoMemberCardBundle /* Showcase LSBC (DEV) */,
  [CREDENTIALS.SHOWCASE_LAWYER_TEST]: demoMemberCardBundle /* Showcase LSBC (TEST) */,
  [CREDENTIALS.SHOWCASE_LAWYER_PROD]: demoMemberCardBundle /* Showcase LSBC (PROD) */,
  [CREDENTIALS.SHOWCASE_STUDENT_DEV]: studentCardBundle /* Showcase Student (DEV) */,
  [CREDENTIALS.SHOWCASE_STUDENT_TEST]: studentCardBundle /* Showcase Student (TEST) */,
  /* Showcase Student (PROD) */
  [CREDENTIALS.SHOWCASE_STUDENT_PROD]: studentCardBundle,
  // ↓↓↓ https://github.com/bcgov/bc-wallet-mobile/discussions/506
  [CREDENTIALS.UNVERIFIED_PERSON_DEV]: unverifiedPersonCardBundle /* Unverified Person (DEV) */,
  [CREDENTIALS.UNVERIFIED_PERSON_TEST]: unverifiedPersonCardBundle /* Unverified Person (TEST) */,
  [CREDENTIALS.UNVERIFIED_PERSON_PROD]: unverifiedPersonCardBundle /* Unverified Person (DEV) */,
  // ↓↓↓ https://github.com/bcgov/bc-wallet-mobile/discussions/604
  [CREDENTIALS.PILOT_INVITE_TEST]: digitalIdInvitationCardBundle /* (TEST) */,
  'XpgeQa93eZvGSZBZef3PHn:2:Person:0.1': digitalIdCardBundle /* (TEST) */,
  [CREDENTIALS.BC_DIGITAL_ID_QA]: digitalIdCardBundle /* (QA) */,
  [CREDENTIALS.BC_DIGITAL_ID_SIT]: digitalIdCardBundle /* (SIT) */,
}
