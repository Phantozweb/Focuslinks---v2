import React, { useState, useEffect } from 'react';
import { Header } from './components/Header';
import { AppSidebar } from './components/layout/AppSidebar';
import { MobileBottomNav } from './components/MobileBottomNav';
import { FeedView } from './components/FeedView';
import { LinkedInProfileView } from './components/LinkedInProfileView';
import { ExploreView } from './components/ExploreView';
import { CirclesView } from './components/CirclesView';
import { DoctorsDirectoryView } from './components/DoctorsDirectoryView';
import { StoryModal } from './components/StoryModal';
import { UIPost } from './components/UIPost';
import { EditProfileModal } from './components/EditProfileModal';
import { NotificationsDrawer } from './components/NotificationsDrawer';
import { LandingPage } from './components/landing';
import { AnalyticsView } from './components/AnalyticsView';
import { SettingsView } from './components/SettingsView';
import { MobileNavDrawer } from './components/layout/MobileNavDrawer';
import { AuthGateModal } from './components/AuthGateModal';
import { PopupLoginModal } from './components/auth/PopupLoginModal';
import { ConsultsView } from './components/consults';
import {
  CURRENT_USER,
  OTHER_DOCTORS,
  MOCK_POSTS,
  MOCK_STORIES,
  MOCK_GROUPS,
  MOCK_NOTIFICATIONS
} from './data/mockData';
import { MOCK_TOPICS, MOCK_QUESTIONS } from './data/mockQaData';
import { DoctorProfile, ClinicalPost, ClinicalStory, OdGroup, NotificationItem, QuestionTopic, ClinicalQuestion } from './types';

export type ActiveTabType = 'feed' | 'consults' | 'qa' | 'gallery' | 'groups' | 'doctors' | 'analytics' | 'profile' | 'settings';

export default function App() {
  const [isNewUserLanding, setIsNewUserLanding] = useState<boolean>(true);
  const [isLoggedIn, setIsLoggedIn] = useState<boolean>(true);
  const [isAuthGateOpen, setIsAuthGateOpen] = useState<boolean>(false);
  const [isPopupLoginOpen, setIsPopupLoginOpen] = useState<boolean>(false);
  const [authGateMode, setAuthGateMode] = useState<'login' | 'onboarding'>('login');
  const [pendingTab, setPendingTab] = useState<ActiveTabType | null>(null);
  
  const [currentTab, setCurrentTab] = useState<ActiveTabType>('feed');
  const [darkMode, setDarkMode] = useState<boolean>(true);
  const [currentUser, setCurrentUser] = useState<DoctorProfile>(CURRENT_USER);
  const [viewingDoctor, setViewingDoctor] = useState<DoctorProfile>(CURRENT_USER);
  const [allDoctors, setAllDoctors] = useState<DoctorProfile[]>([CURRENT_USER, ...OTHER_DOCTORS]);
  const [posts, setPosts] = useState<ClinicalPost[]>(MOCK_POSTS);
  const [stories, setStories] = useState<ClinicalStory[]>(MOCK_STORIES);
  const [groups, setGroups] = useState<OdGroup[]>(MOCK_GROUPS);
  const [notifications, setNotifications] = useState<NotificationItem[]>(MOCK_NOTIFICATIONS);
  const [topics, setTopics] = useState<QuestionTopic[]>(MOCK_TOPICS);
  const [questions, setQuestions] = useState<ClinicalQuestion[]>(MOCK_QUESTIONS);

  const [activeStory, setActiveStory] = useState<ClinicalStory | null>(null);
  const [isCreatePostOpen, setIsCreatePostOpen] = useState<boolean>(false);
  const [createPostMode, setCreatePostMode] = useState<'pearl' | 'media' | 'article' | 'case' | 'poll'>('pearl');
  const [isEditProfileOpen, setIsEditProfileOpen] = useState<boolean>(false);
  const [isNotificationsOpen, setIsNotificationsOpen] = useState<boolean>(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState<boolean>(false);
  const [activeFilter, setActiveFilter] = useState<string>('All Threads');
  const [searchQuery, setSearchQuery] = useState<string>('');

  const handleOpenCreatePost = (mode: 'pearl' | 'media' | 'article' | 'case' | 'poll' = 'pearl') => {
    setCreatePostMode(mode);
    setIsCreatePostOpen(true);
  };

  // Handle dark mode classes
  useEffect(() => {
    if (darkMode) {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  }, [darkMode]);

  const toggleDarkMode = () => {
    setDarkMode(!darkMode);
  };

  // Centralized tab selection: guarantees "My Profile" strictly displays the user's own profile
  const handleSelectTab = (tab: ActiveTabType) => {
    if (tab === 'profile') {
      setViewingDoctor(currentUser);
    }
    setCurrentTab(tab);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  // Switch to viewing a doctor's LinkedIn profile
  const handleViewDoctorProfile = (doctorId: string) => {
    if (doctorId === currentUser.id) {
      setViewingDoctor(currentUser);
      setCurrentTab('profile');
      window.scrollTo({ top: 0, behavior: 'smooth' });
      return;
    }
    const found = allDoctors.find((d) => d.id === doctorId);
    if (found) {
      setViewingDoctor(found);
      setCurrentTab('profile');
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  };

  // Endorse specialty on LinkedIn profile
  const handleToggleEndorse = (specialtyId: string) => {
    setViewingDoctor((prevDoc) => {
      const updatedSpecs = prevDoc.clinicalSpecialties.map((spec) => {
        if (spec.id === specialtyId) {
          const isEndorsed = spec.userEndorsed;
          return {
            ...spec,
            userEndorsed: !isEndorsed,
            endorsementsCount: isEndorsed ? spec.endorsementsCount - 1 : spec.endorsementsCount + 1,
            endorsers: isEndorsed
              ? spec.endorsers.filter((e) => e.name !== currentUser.name)
              : [
                  {
                    name: currentUser.name,
                    role: currentUser.credentials,
                    avatar: currentUser.avatar,
                  },
                  ...spec.endorsers,
                ],
          };
        }
        return spec;
      });
      return { ...prevDoc, clinicalSpecialties: updatedSpecs };
    });

    if (viewingDoctor.id === currentUser.id) {
      setCurrentUser((prev) => ({
        ...prev,
        clinicalSpecialties: prev.clinicalSpecialties.map((spec) => {
          if (spec.id === specialtyId) {
            const isEndorsed = spec.userEndorsed;
            return {
              ...spec,
              userEndorsed: !isEndorsed,
              endorsementsCount: isEndorsed ? spec.endorsementsCount - 1 : spec.endorsementsCount + 1,
            };
          }
          return spec;
        }),
      }));
    }
  };

  // Save edited profile
  const handleSaveProfile = (updatedProfile: DoctorProfile) => {
    setCurrentUser(updatedProfile);
    if (viewingDoctor.id === updatedProfile.id) {
      setViewingDoctor(updatedProfile);
    }
    setAllDoctors((prev) =>
      prev.map((d) => (d.id === updatedProfile.id ? updatedProfile : d))
    );
  };

  // Like a post
  const handleLikePost = (postId: string) => {
    setPosts((prev) =>
      prev.map((p) => {
        if (p.id === postId) {
          const isLiked = p.isLiked;
          return {
            ...p,
            isLiked: !isLiked,
            likes: isLiked ? p.likes - 1 : p.likes + 1,
          };
        }
        return p;
      })
    );
  };

  // Repost a post
  const handleRepostPost = (postId: string) => {
    setPosts((prev) =>
      prev.map((p) => {
        if (p.id === postId) {
          const isReposted = p.isReposted;
          return {
            ...p,
            isReposted: !isReposted,
            reposts: isReposted ? p.reposts - 1 : p.reposts + 1,
          };
        }
        return p;
      })
    );
  };

  // Bookmark a post
  const handleBookmarkPost = (postId: string) => {
    setPosts((prev) =>
      prev.map((p) => {
        if (p.id === postId) {
          return { ...p, bookmarked: !p.bookmarked };
        }
        return p;
      })
    );
  };

  // Vote in Diagnostic Poll
  const handleVotePoll = (postId: string, optionId: string) => {
    setPosts((prev) =>
      prev.map((p) => {
        if (p.id === postId && p.poll) {
          if (p.poll.userVotedOptionId === optionId) return p;

          const updatedOptions = p.poll.options.map((opt) => {
            if (opt.id === optionId) {
              return { ...opt, votes: opt.votes + 1 };
            }
            if (p.poll?.userVotedOptionId === opt.id) {
              return { ...opt, votes: Math.max(0, opt.votes - 1) };
            }
            return opt;
          });

          const totalVotes = updatedOptions.reduce((acc, o) => acc + o.votes, 0);

          return {
            ...p,
            poll: {
              ...p.poll,
              options: updatedOptions,
              totalVotes,
              userVotedOptionId: optionId,
            },
          };
        }
        return p;
      })
    );
  };

  // Add Comment to Post
  const handleAddComment = (postId: string, commentText: string) => {
    const newComment = {
      id: `c-${Date.now()}`,
      authorId: currentUser.id,
      authorName: currentUser.name,
      authorCredentials: currentUser.credentials,
      authorAvatar: currentUser.avatar,
      createdAt: 'Just now',
      content: commentText,
      likes: 0,
    };

    setPosts((prev) =>
      prev.map((p) => {
        if (p.id === postId) {
          return {
            ...p,
            comments: [newComment, ...p.comments],
            repliesThreadCount: p.repliesThreadCount + 1,
          };
        }
        return p;
      })
    );
  };

  // Publish New Post / Case / Poll / Article / Pearl
  const handleCreatePost = (postData: Partial<ClinicalPost>) => {
    const newPost: ClinicalPost = {
      id: `post-${Date.now()}`,
      author: currentUser,
      createdAt: 'Just now',
      content: postData.content || '',
      tags: postData.tags || ['#OptometryPearls'],
      images: postData.images,
      imageAlts: postData.imageAlts,
      clinicalMetadata: postData.clinicalMetadata,
      poll: postData.poll,
      cardCategory: postData.cardCategory || 'pearl',
      pearlHeadline: postData.pearlHeadline,
      articleMetadata: postData.articleMetadata,
      aspectRatio: postData.aspectRatio || 'wide',
      likes: 1,
      isLiked: true,
      reposts: 0,
      isReposted: false,
      bookmarked: false,
      comments: [],
      repliesThreadCount: 0,
    };

    setPosts([newPost, ...posts]);
    setCurrentTab('feed');
  };

  // Toggle group membership
  const handleToggleGroup = (groupId: string) => {
    setGroups((prev) =>
      prev.map((g) => {
        if (g.id === groupId) {
          const isJoined = g.isJoined;
          return {
            ...g,
            isJoined: !isJoined,
            membersCount: isJoined ? g.membersCount - 1 : g.membersCount + 1,
          };
        }
        return g;
      })
    );
  };

  // Mark notifications read
  const handleMarkAllNotificationsRead = () => {
    setNotifications((prev) => prev.map((n) => ({ ...n, unread: false })));
  };

  // Search filtering
  const displayPosts = posts.filter((post) => {
    if (!searchQuery.trim()) return true;
    const q = searchQuery.toLowerCase();
    return (
      post.content.toLowerCase().includes(q) ||
      post.author.name.toLowerCase().includes(q) ||
      post.tags.some((t) => t.toLowerCase().includes(q)) ||
      post.clinicalMetadata?.instrumentUsed?.toLowerCase().includes(q)
    );
  });

  const unreadNotificationsCount = notifications.filter((n) => n.unread).length;

  const handleGetFreeId = () => {
    setAuthGateMode('onboarding');
    setIsAuthGateOpen(true);
  };

  const handleLoginSuccess = (membershipId: string, doctorName?: string, email?: string) => {
    setIsLoggedIn(true);
    setIsNewUserLanding(false);
    setIsPopupLoginOpen(false);
    setIsAuthGateOpen(false);
    setCurrentUser(prev => ({
      ...prev,
      membershipId: membershipId,
      name: doctorName || prev.name,
      email: email || prev.email,
    }));
    if (pendingTab) {
      setCurrentTab(pendingTab);
      setPendingTab(null);
    } else {
      setCurrentTab('feed');
    }
  };

  // Q&A Handlers (Quora-inspired Consult Library)
  const handleVoteQuestion = (questionId: string, direction: 'up' | 'down') => {
    setQuestions((prev) =>
      prev.map((q) => {
        if (q.id === questionId) {
          const currentVote = q.userVote;
          let upvotes = q.upvotes;
          let downvotes = q.downvotes;
          let newVote: 'up' | 'down' | undefined = direction;

          if (currentVote === direction) {
            newVote = undefined;
            if (direction === 'up') upvotes--;
            else downvotes--;
          } else {
            if (direction === 'up') {
              upvotes++;
              if (currentVote === 'down') downvotes--;
            } else {
              downvotes++;
              if (currentVote === 'up') upvotes--;
            }
          }

          return {
            ...q,
            upvotes: Math.max(0, upvotes),
            downvotes: Math.max(0, downvotes),
            userVote: newVote,
          };
        }
        return q;
      })
    );
  };

  const handleVoteAnswer = (questionId: string, answerId: string, direction: 'up' | 'down') => {
    setQuestions((prev) =>
      prev.map((q) => {
        if (q.id === questionId) {
          return {
            ...q,
            answers: q.answers.map((a) => {
              if (a.id === answerId) {
                const currentVote = a.userVote;
                let upvotes = a.upvotes;
                let downvotes = a.downvotes;
                let newVote: 'up' | 'down' | undefined = direction;

                if (currentVote === direction) {
                  newVote = undefined;
                  if (direction === 'up') upvotes--;
                  else downvotes--;
                } else {
                  if (direction === 'up') {
                    upvotes++;
                    if (currentVote === 'down') downvotes--;
                  } else {
                    downvotes++;
                    if (currentVote === 'up') upvotes--;
                  }
                }

                return {
                  ...a,
                  upvotes: Math.max(0, upvotes),
                  downvotes: Math.max(0, downvotes),
                  userVote: newVote,
                };
              }
              return a;
            }),
          };
        }
        return q;
      })
    );
  };

  const handleToggleBookmarkQuestion = (questionId: string) => {
    setQuestions((prev) =>
      prev.map((q) => (q.id === questionId ? { ...q, isBookmarked: !q.isBookmarked } : q))
    );
  };

  const handleToggleFollowQuestion = (questionId: string) => {
    setQuestions((prev) =>
      prev.map((q) => (q.id === questionId ? { ...q, isFollowed: !q.isFollowed } : q))
    );
  };

  const handleToggleFollowTopic = (topicId: string) => {
    setTopics((prev) =>
      prev.map((t) => {
        if (t.id === topicId) {
          const isFollowed = !t.isFollowed;
          return {
            ...t,
            isFollowed,
            followersCount: isFollowed ? t.followersCount + 1 : Math.max(0, t.followersCount - 1),
          };
        }
        return t;
      })
    );
  };

  const handleCreateQuestion = (newQuestionData: any) => {
    const newQuestion: ClinicalQuestion = {
      ...newQuestionData,
      id: `q-${Date.now()}`,
      createdAt: 'Just now',
      upvotes: 1,
      downvotes: 0,
      userVote: 'up',
      answersCount: 0,
      viewsCount: 1,
      isFollowed: true,
      isBookmarked: false,
      answers: [],
    };

    setQuestions((prev) => [newQuestion, ...prev]);

    setTopics((prev) =>
      prev.map((t) => (t.id === newQuestionData.topicId ? { ...t, questionsCount: t.questionsCount + 1 } : t))
    );
  };

  const handleAddAnswer = (questionId: string, answerText: string, pearls?: string[]) => {
    const newAnswer = {
      id: `ans-${Date.now()}`,
      questionId,
      author: currentUser,
      createdAt: 'Just now',
      content: answerText,
      upvotes: 1,
      downvotes: 0,
      userVote: 'up' as const,
      isAcceptedAnswer: false,
      clinicalPearlsCited: pearls,
      comments: [],
    };

    setQuestions((prev) =>
      prev.map((q) => {
        if (q.id === questionId) {
          return {
            ...q,
            answers: [newAnswer, ...q.answers],
            answersCount: q.answersCount + 1,
          };
        }
        return q;
      })
    );
  };

  const handleAddCommentToAnswer = (questionId: string, answerId: string, commentText: string) => {
    const newComment = {
      id: `c-ans-${Date.now()}`,
      author: currentUser,
      content: commentText,
      createdAt: 'Just now',
      likes: 0,
    };

    setQuestions((prev) =>
      prev.map((q) => {
        if (q.id === questionId) {
          return {
            ...q,
            answers: q.answers.map((a) => {
              if (a.id === answerId) {
                return {
                  ...a,
                  comments: [...(a.comments || []), newComment],
                };
              }
              return a;
            }),
          };
        }
        return q;
      })
    );
  };

  const handleLikeAnswerComment = (questionId: string, answerId: string, commentId: string) => {
    setQuestions((prev) =>
      prev.map((q) => {
        if (q.id === questionId) {
          return {
            ...q,
            answers: q.answers.map((a) => {
              if (a.id === answerId) {
                return {
                  ...a,
                  comments: a.comments.map((c) => {
                    if (c.id === commentId) {
                      const isLiked = c.isLiked;
                      return {
                        ...c,
                        isLiked: !isLiked,
                        likes: isLiked ? c.likes - 1 : c.likes + 1,
                      };
                    }
                    return c;
                  }),
                };
              }
              return a;
            }),
          };
        }
        return q;
      })
    );
  };

  if (isNewUserLanding) {
    return (
      <>
        <LandingPage
          darkMode={darkMode}
          onToggleDarkMode={toggleDarkMode}
          currentUser={currentUser}
          isLoggedIn={isLoggedIn}
          onGetFreeId={handleGetFreeId}
          onOpenLogin={() => setIsPopupLoginOpen(true)}
          onSuccessLogin={(memId) => {
            setIsLoggedIn(true);
            setCurrentUser(prev => ({
              ...prev,
              membershipId: memId
            }));
          }}
          onEnterApp={(destination) => {
            const tab = destination || 'feed';
            setIsLoggedIn(true);
            setCurrentUser(CURRENT_USER);
            setCurrentTab(tab);
            setIsNewUserLanding(false);
          }}
        />

        {/* Dedicated Popup Login Screen (Gmail or Membership ID) */}
        <PopupLoginModal
          isOpen={isPopupLoginOpen}
          onClose={() => setIsPopupLoginOpen(false)}
          onSuccess={handleLoginSuccess}
          onSwitchToRegister={() => {
            setIsPopupLoginOpen(false);
            handleGetFreeId();
          }}
        />

        {/* Comprehensive Onboarding Verification / Document Gate */}
        <AuthGateModal
          isOpen={isAuthGateOpen}
          onClose={() => setIsAuthGateOpen(false)}
          initialMode={authGateMode}
          onSuccess={(memId) => {
            handleLoginSuccess(memId);
          }}
        />
      </>
    );
  }

  return (
    <div className="min-h-dvh bg-neutral-50 dark:bg-[#0c0c11] text-neutral-900 dark:text-neutral-100 transition-colors selection:bg-blue-500 selection:text-white flex">
      {/* 1. Desktop Left Sidebar Navigation Rail */}
      <AppSidebar
        currentTab={currentTab}
        onSelectTab={handleSelectTab}
        currentUser={currentUser}
        isLoggedIn={isLoggedIn}
        onOpenLogin={() => setIsPopupLoginOpen(true)}
        onOpenCreatePost={() => {
          if (!isLoggedIn) {
            setIsPopupLoginOpen(true);
          } else {
            handleOpenCreatePost('pearl');
          }
        }}
        onOpenLandingPage={() => setIsNewUserLanding(true)}
        onLogOut={() => {
          setIsLoggedIn(false);
          setIsNewUserLanding(true);
        }}
        unreadCount={unreadNotificationsCount}
        onOpenNotifications={() => setIsNotificationsOpen(true)}
      />

      {/* 2. Main Content Column */}
      <div className="flex-1 flex flex-col min-w-0">
        {/* Contextual Top Bar */}
        <Header
          currentTab={currentTab}
          onSelectTab={handleSelectTab}
          currentUser={currentUser}
          darkMode={darkMode}
          onToggleDarkMode={toggleDarkMode}
          onOpenCreatePost={() => {
            if (!isLoggedIn) {
              setIsPopupLoginOpen(true);
            } else {
              handleOpenCreatePost('pearl');
            }
          }}
          onOpenNotifications={() => setIsNotificationsOpen(true)}
          unreadCount={unreadNotificationsCount}
          searchQuery={searchQuery}
          onSearchChange={setSearchQuery}
          onOpenLandingPage={() => setIsNewUserLanding(true)}
          onLogOut={() => {
            setIsLoggedIn(false);
            setIsNewUserLanding(true);
          }}
          isLoggedIn={isLoggedIn}
          onOpenLogin={() => setIsPopupLoginOpen(true)}
          onOpenMobileMenu={() => setIsMobileMenuOpen(true)}
        />

        {/* Main Content Area — the single width/gutter owner for every view.
            Fluid up to 1600px with scaling gutters; views render w-full inside. */}
        <main className="flex-1 w-full max-w-[1600px] mx-auto px-3 sm:px-6 lg:px-8 xl:px-12 2xl:px-16 pt-4 sm:pt-6 pb-28 lg:pb-12">
          {currentTab === 'feed' && (
            <FeedView
              posts={displayPosts}
              stories={stories}
              currentUser={currentUser}
              onOpenNewPost={(mode) => {
                if (!isLoggedIn) {
                  setIsPopupLoginOpen(true);
                } else {
                  handleOpenCreatePost(mode);
                }
              }}
              onSelectStory={(story) => setActiveStory(story)}
              onViewDoctorProfile={handleViewDoctorProfile}
              onLikePost={(postId) => {
                if (!isLoggedIn) {
                  setIsPopupLoginOpen(true);
                } else {
                  handleLikePost(postId);
                }
              }}
              onRepostPost={(postId) => {
                if (!isLoggedIn) {
                  setIsPopupLoginOpen(true);
                } else {
                  handleRepostPost(postId);
                }
              }}
              onBookmarkPost={handleBookmarkPost}
              onVotePoll={(postId, optionId) => {
                if (!isLoggedIn) {
                  setIsPopupLoginOpen(true);
                } else {
                  handleVotePoll(postId, optionId);
                }
              }}
              onAddComment={(postId, commentText) => {
                if (!isLoggedIn) {
                  setIsPopupLoginOpen(true);
                } else {
                  handleAddComment(postId, commentText);
                }
              }}
              activeFilter={activeFilter}
              onSelectFilter={setActiveFilter}
            />
          )}

          {(currentTab === 'consults' || currentTab === 'qa') && (
            <ConsultsView
              questions={questions}
              topics={topics}
              currentUser={currentUser}
              onVoteQuestion={handleVoteQuestion}
              onVoteAnswer={handleVoteAnswer}
              onToggleBookmark={handleToggleBookmarkQuestion}
              onToggleFollowQuestion={handleToggleFollowQuestion}
              onToggleFollowTopic={handleToggleFollowTopic}
              onCreateQuestion={handleCreateQuestion}
              onAddAnswer={handleAddAnswer}
              onAddCommentToAnswer={handleAddCommentToAnswer}
              onLikeAnswerComment={handleLikeAnswerComment}
              onViewDoctorProfile={handleViewDoctorProfile}
            />
          )}

          {currentTab === 'gallery' && (
            <ExploreView
              posts={posts}
              currentUser={currentUser}
              onViewDoctorProfile={handleViewDoctorProfile}
              onOpenNewPost={() => {
                if (!isLoggedIn) {
                  setIsPopupLoginOpen(true);
                } else {
                  handleOpenCreatePost('pearl');
                }
              }}
              onBookmarkPost={handleBookmarkPost}
            />
          )}

          {currentTab === 'groups' && (
            <CirclesView
              groups={groups}
              currentUser={currentUser}
              onJoinToggle={(groupId) => {
                if (!isLoggedIn) {
                  setIsPopupLoginOpen(true);
                } else {
                  handleToggleGroup(groupId);
                }
              }}
              onViewDoctorProfile={handleViewDoctorProfile}
            />
          )}

          {currentTab === 'doctors' && (
            <DoctorsDirectoryView
              currentUser={currentUser}
              allDoctors={allDoctors}
              onViewDoctorProfile={handleViewDoctorProfile}
              onEditProfile={() => {
                if (!isLoggedIn) {
                  setIsPopupLoginOpen(true);
                } else {
                  setIsEditProfileOpen(true);
                }
              }}
            />
          )}

          {currentTab === 'analytics' && (
            <AnalyticsView
              currentUser={currentUser}
              onOpenNewCase={() => {
                if (!isLoggedIn) {
                  setIsPopupLoginOpen(true);
                } else {
                  handleOpenCreatePost('pearl');
                }
              }}
            />
          )}

          {currentTab === 'profile' && (
            <LinkedInProfileView
              profile={viewingDoctor.id === currentUser.id ? currentUser : viewingDoctor}
              isCurrentUser={viewingDoctor.id === currentUser.id}
              onEditProfile={() => {
                if (!isLoggedIn) {
                  setIsPopupLoginOpen(true);
                } else {
                  setIsEditProfileOpen(true);
                }
              }}
              onToggleEndorse={(skill) => {
                if (!isLoggedIn) {
                  setIsPopupLoginOpen(true);
                } else {
                  handleToggleEndorse(skill);
                }
              }}
              posts={posts}
              onOpenNewPost={() => {
                if (!isLoggedIn) {
                  setIsPopupLoginOpen(true);
                } else {
                  handleOpenCreatePost('pearl');
                }
              }}
              onSwitchDoctor={(docId) => handleViewDoctorProfile(docId)}
              allDoctors={allDoctors}
              onBackToDirectory={() => setCurrentTab('doctors')}
            />
          )}

          {currentTab === 'settings' && (
            <SettingsView
              currentUser={currentUser}
              darkMode={darkMode}
              onToggleDarkMode={toggleDarkMode}
              onUpdateProfile={(updated) => {
                setCurrentUser((prev) => ({ ...prev, ...updated }));
              }}
            />
          )}
        </main>
      </div>

      {/* Mobile Floating Bottom Bar for Advanced Mobile UX */}
      <MobileBottomNav
        currentTab={currentTab}
        onSelectTab={handleSelectTab}
        currentUser={currentUser}
        onOpenCreatePost={() => {
          if (!isLoggedIn) {
            setIsPopupLoginOpen(true);
          } else {
            handleOpenCreatePost('pearl');
          }
        }}
      />

      {/* Modals and Drawers */}
      <StoryModal
        story={activeStory}
        onClose={() => setActiveStory(null)}
        onViewDoctorProfile={handleViewDoctorProfile}
      />

      <UIPost
        isOpen={isCreatePostOpen}
        onClose={() => setIsCreatePostOpen(false)}
        currentUser={currentUser}
        onSubmitPost={handleCreatePost}
        initialMode={createPostMode}
      />

      <EditProfileModal
        isOpen={isEditProfileOpen}
        onClose={() => setIsEditProfileOpen(false)}
        profile={currentUser}
        onSave={handleSaveProfile}
      />

      <NotificationsDrawer
        isOpen={isNotificationsOpen}
        onClose={() => setIsNotificationsOpen(false)}
        notifications={notifications}
        onMarkAllAsRead={handleMarkAllNotificationsRead}
        onViewDoctorProfile={handleViewDoctorProfile}
      />

      <PopupLoginModal
        isOpen={isPopupLoginOpen}
        onClose={() => setIsPopupLoginOpen(false)}
        onSuccess={handleLoginSuccess}
        onSwitchToRegister={() => {
          setIsPopupLoginOpen(false);
          handleGetFreeId();
        }}
      />

      {/* Mobile Drawer Navigation for < lg devices */}
      <MobileNavDrawer
        isOpen={isMobileMenuOpen}
        onClose={() => setIsMobileMenuOpen(false)}
        currentTab={currentTab}
        onSelectTab={handleSelectTab}
        currentUser={currentUser}
        isLoggedIn={isLoggedIn}
        onOpenLogin={() => setIsPopupLoginOpen(true)}
        onOpenCreatePost={() => {
          if (!isLoggedIn) {
            setIsPopupLoginOpen(true);
          } else {
            handleOpenCreatePost('pearl');
          }
        }}
        onOpenLandingPage={() => setIsNewUserLanding(true)}
        onLogOut={() => {
          setIsLoggedIn(false);
          setIsNewUserLanding(true);
        }}
        darkMode={darkMode}
        onToggleDarkMode={toggleDarkMode}
      />
    </div>
  );
}
