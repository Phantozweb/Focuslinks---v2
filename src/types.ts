export interface DoctorProfile {
  id: string;
  name: string;
  credentials: string; // e.g., "OD, FAAO, FSLS"
  headline: string;
  currentRole: string;
  clinicName: string;
  location: string;
  avatar: string;
  bannerImage: string;
  verified: boolean;
  membershipId?: string;
  email?: string;
  licenseNumber: string;
  licenseState: string;
  npiNumber: string;
  deActive: boolean;
  connectionsCount: number;
  followersCount: number;
  profileViewsThisWeek: number;
  searchAppearances: number;
  openTo: {
    referrals: boolean;
    locumTenens: boolean;
    clinicalTrials: boolean;
    consulting: boolean;
  };
  about: string;
  clinicalSpecialties: SpecialtyEndorsement[];
  experiences: ExperienceItem[];
  education: EducationItem[];
  certifications: CertificationItem[];
  publications: PublicationItem[];
  diagnosticTechnologies: DiagnosticTechItem[];
  recommendations: RecommendationItem[];
  featuredPostsIds: string[];
  subspecialtyCategory?: 'Cornea & Sclerals' | 'Pediatric Myopia' | 'Glaucoma & Neuro' | 'Dry Eye & Aesthetics' | 'Retina & Surgical' | 'General & Primary Care';
  cityState?: string;
  distanceMiles?: number;
  isTrending?: boolean;
  isNew?: boolean;
  peerConcordance?: number;
  casesPublished?: number;
  pearlsCited?: number;
  isConnected?: boolean;
  isFollowing?: boolean;
}

export interface SpecialtyEndorsement {
  id: string;
  name: string;
  category: 'Anterior Segment' | 'Posterior Segment' | 'Specialty Lenses' | 'Pediatrics & Myopia' | 'Technology & Surgery';
  endorsementsCount: number;
  userEndorsed?: boolean;
  endorsers: {
    name: string;
    role: string;
    avatar: string;
  }[];
}

export interface ExperienceItem {
  id: string;
  title: string;
  clinic: string;
  location: string;
  startDate: string;
  endDate: string;
  isCurrent: boolean;
  description: string;
  technologiesUsed: string[];
  caseVolume?: string;
  logo?: string;
}

export interface EducationItem {
  id: string;
  degree: string;
  institution: string;
  fieldOfStudy: string;
  startYear: string;
  endYear: string;
  honors?: string;
  logo?: string;
}

export interface CertificationItem {
  id: string;
  name: string;
  issuingOrganization: string;
  issueDate: string;
  expirationDate?: string;
  credentialId: string;
  verificationUrl?: string;
  badge?: string;
}

export interface PublicationItem {
  id: string;
  title: string;
  journal: string;
  publicationDate: string;
  authors: string;
  doi?: string;
  abstractSnippet: string;
  link?: string;
}

export interface DiagnosticTechItem {
  name: string;
  category: string;
  proficiency: 'Master / Clinical Expert' | 'Advanced Daily Operator' | 'Certified';
  yearsUsing: number;
}

export interface RecommendationItem {
  id: string;
  authorName: string;
  authorTitle: string;
  authorClinic: string;
  authorAvatar: string;
  relationship: string;
  date: string;
  text: string;
}

export interface PostComment {
  id: string;
  authorId: string;
  authorName: string;
  authorCredentials: string;
  authorAvatar: string;
  createdAt: string;
  content: string;
  likes: number;
  isLiked?: boolean;
}

export interface PostPoll {
  question: string;
  options: {
    id: string;
    text: string;
    votes: number;
  }[];
  totalVotes: number;
  userVotedOptionId?: string;
}

export interface ClinicalArticleSection {
  heading: string;
  body: string;
}

export interface ClinicalArticleMetadata {
  title: string;
  subtitle?: string;
  abstract?: string;
  readTimeMinutes?: number;
  sections?: ClinicalArticleSection[];
  citations?: string[];
  peerReviewed?: boolean;
}

export interface ClinicalPost {
  id: string;
  author: DoctorProfile;
  createdAt: string;
  content: string;
  tags: string[];
  images?: string[];
  aspectRatio?: 'tall' | 'square' | 'wide' | 'panoramic';
  cardCategory?: 'slit-lamp' | 'oct' | 'topography' | 'poll' | 'pearl' | 'grand-rounds' | 'article';
  pearlHeadline?: string;
  articleMetadata?: ClinicalArticleMetadata;
  savedCollection?: string;
  clinicalMetadata?: {
    patientAgeSex?: string;
    chiefComplaint?: string;
    instrumentUsed?: string;
    diagnosisType?: 'Definitive' | 'Differential / Peer Review' | 'Case Showcase';
    acuity?: string;
    intraocularPressure?: string;
  };
  poll?: PostPoll;
  likes: number;
  isLiked?: boolean;
  reposts: number;
  isReposted?: boolean;
  bookmarked?: boolean;
  comments: PostComment[];
  repliesThreadCount: number;
}

export interface ClinicalStory {
  id: string;
  author: DoctorProfile;
  title: string;
  thumbnail: string;
  category: string;
  modality?: string;
  urgency?: 'urgent' | 'case-of-day' | 'pearl' | 'routine';
  caseDescription: string;
  diagnosis: string;
  findings: string[];
  treatment: string;
}

export interface CircleChannel {
  id: string;
  name: string;
  description: string;
  category: 'announcements' | 'text' | 'polls' | 'voice' | 'grand-rounds' | 'protocols';
  unreadCount?: number;
  isLocked?: boolean;
}

export interface OdGroup {
  id: string;
  name: string;
  description: string;
  membersCount: number;
  category: string;
  coverImage: string;
  isJoined: boolean;
  recentTopic: string;
  activeDiscussions: number;
  type?: 'reddit-community' | 'telegram-broadcast' | 'whatsapp-consult';
  channelHandle?: string;
  activeOnline?: number;
  unreadCount?: number;
  isFeatured?: boolean;
  tags?: string[];
  channels?: CircleChannel[];
  pinnedProtocol?: {
    title: string;
    fileType: string;
    size: string;
    downloads: number;
  };
  voiceNotesCount?: number;
  rules?: string[];
}

export interface CircleThread {
  id: string;
  circleId: string;
  author: DoctorProfile;
  createdAt: string;
  title: string;
  content: string;
  flair: string;
  flairColor: 'blue' | 'purple' | 'emerald' | 'amber' | 'rose';
  upvotes: number;
  userVote?: 'up' | 'down';
  commentsCount: number;
  image?: string;
  isPinned?: boolean;
}

export interface CircleChatMessage {
  id: string;
  circleId: string;
  author: DoctorProfile;
  timestamp: string;
  text: string;
  image?: string;
  voiceNote?: {
    duration: string;
    waveform: number[];
  };
  poll?: {
    id: string;
    question: string;
    options: { id: string; text: string; votes: number }[];
    totalVotes: number;
    userVotedId?: string;
    explanation?: string;
  };
  reactions?: { emoji: string; count: number; userReacted?: boolean }[];
}

export interface NotificationItem {
  id: string;
  type: 'endorsement' | 'comment' | 'repost' | 'connection' | 'mention';
  actorName: string;
  actorAvatar: string;
  actorCredentials: string;
  text: string;
  timeAgo: string;
  unread: boolean;
  targetId?: string;
}

export interface ClinicalEvent {
  id: string;
  title: string;
  category: 'Webinar' | 'Grand Rounds' | 'Global Congress' | 'Workshop' | 'Journal Club';
  subspecialty: string;
  date: string; // e.g. "Wednesday, Oct 14, 2026"
  time: string; // e.g. "19:00 - 20:30 UTC (3:00 PM EDT / 8:00 PM BST)"
  daysUntil: number; // e.g. 2
  speaker: {
    name: string;
    credentials: string; // e.g. "OD, FAAO, FSLS" or "MCOptom, PhD"
    role: string;
    institution: string;
    avatar: string;
  };
  hostCircleId?: string;
  hostCircleName?: string;
  description: string;
  keyLearnings: string[];
  locationType: 'Live Virtual (Zoom)' | 'Hybrid (London & Online)' | 'Hybrid (San Diego & Online)' | 'Interactive Stream';
  ceCredits?: string; // e.g. "2.0 COPE / CPD Accredited"
  attendeesCount: number;
  isRegistered?: boolean;
  tags: string[];
  calendarLinkUrl?: string;
}

export type OptomCircle = OdGroup;

export interface QuestionTopic {
  id: string;
  name: string;
  slug: string;
  description: string;
  iconName: string;
  bannerColor: string;
  followersCount: number;
  questionsCount: number;
  isFollowed?: boolean;
  featuredQuestionsIds?: string[];
  trendingTags?: string[];
  isPopular?: boolean;
  isRecommended?: boolean;
  isTrending?: boolean;
  gradient?: string;
  recentActivity?: string;
  imageUrl?: string;
  isStudentFriendly?: boolean;
}

export interface QuestionAnswerComment {
  id: string;
  author: DoctorProfile;
  content: string;
  createdAt: string;
  likes: number;
  isLiked?: boolean;
}

export interface QuestionAnswer {
  id: string;
  questionId: string;
  author: DoctorProfile;
  createdAt: string;
  content: string;
  upvotes: number;
  downvotes: number;
  userVote?: 'up' | 'down';
  isAcceptedAnswer?: boolean;
  isPeerEndorsed?: boolean;
  isAttendingEndorsed?: boolean;
  endorsedByDoctorName?: string;
  authorRoleBadge?: string; // e.g. "OD Student (NECO)", "Resident", "Attending OD", "FAAO Specialist"
  isStudentContribution?: boolean;
  clinicalPearlsCited?: string[];
  attachedImages?: string[];
  comments: QuestionAnswerComment[];
}

export interface ClinicalQuestion {
  id: string;
  title: string;
  content: string;
  topicId: string;
  topicName: string;
  tags: string[];
  author: DoctorProfile;
  createdAt: string;
  upvotes: number;
  downvotes: number;
  userVote?: 'up' | 'down';
  answersCount: number;
  viewsCount: number;
  isFollowed?: boolean;
  isBookmarked?: boolean;
  savedFolder?: string;
  images?: string[];
  clinicalData?: {
    patientAgeSex?: string;
    visualAcuity?: string;
    intraocularPressure?: string;
    chiefComplaint?: string;
    instrumentUsed?: string;
    medicalHistory?: string;
  };
  answers: QuestionAnswer[];
  urgency?: 'routine' | 'urgent' | 'case-consult' | 'grand-rounds';
  isStudentFriendly?: boolean; // Trainees & optometry students encouraged to answer
  trainingLevel?: 'all-levels' | 'student-friendly' | 'grand-rounds';
}
