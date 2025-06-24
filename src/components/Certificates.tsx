import React, { useState } from 'react';
import { Award, Download, Share2, Eye, Search, Filter, Calendar, CheckCircle, ExternalLink, Trophy, Star, Globe } from 'lucide-react';

interface Certificate {
  id: string;
  title: string;
  skillId: string;
  issuedAt: Date;
  certificateNumber: string;
  verificationHash: string;
  credentialUrl: string;
  category: string;
  difficulty: string;
  xpEarned: number;
  badgeIcon: string;
}

const Certificates: React.FC = () => {
  const [selectedTab, setSelectedTab] = useState<'earned' | 'available' | 'verification'>('earned');
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCertificate, setSelectedCertificate] = useState<Certificate | null>(null);

  const earnedCertificates: Certificate[] = [
    {
      id: '1',
      title: 'React Fundamentals Certification',
      skillId: '1',
      issuedAt: new Date('2024-02-15'),
      certificateNumber: 'SA-RF-2024-001234',
      verificationHash: 'a3b2c1d4e5f6789',
      credentialUrl: 'https://skillarena.com/verify/a3b2c1d4e5f6789',
      category: 'Frontend Development',
      difficulty: 'Beginner',
      xpEarned: 250,
      badgeIcon: '⚛️'
    },
    {
      id: '2',
      title: 'TypeScript Mastery Certification',
      skillId: '2',
      issuedAt: new Date('2024-02-20'),
      certificateNumber: 'SA-TS-2024-001235',
      verificationHash: 'b4c3d2e1f5g6890',
      credentialUrl: 'https://skillarena.com/verify/b4c3d2e1f5g6890',
      category: 'Programming Languages',
      difficulty: 'Intermediate',
      xpEarned: 400,
      badgeIcon: '🔷'
    },
    {
      id: '3',
      title: 'Game Testing Professional',
      skillId: '5',
      issuedAt: new Date('2024-02-25'),
      certificateNumber: 'SA-GT-2024-001236',
      verificationHash: 'c5d4e3f2g1h7891',
      credentialUrl: 'https://skillarena.com/verify/c5d4e3f2g1h7891',
      category: 'Quality Assurance',
      difficulty: 'Advanced',
      xpEarned: 600,
      badgeIcon: '🎮'
    }
  ];

  const availableCertificates = [
    {
      id: '4',
      title: 'Node.js Backend Development',
      category: 'Backend Development',
      difficulty: 'Intermediate',
      requirements: ['Complete Node.js skill path', 'Build 2 projects', 'Pass final assessment'],
      xpRequired: 500,
      estimatedTime: '15 hours',
      icon: '🔧'
    },
    {
      id: '5',
      title: 'UI/UX Design Principles',
      category: 'Design',
      difficulty: 'Beginner',
      requirements: ['Complete design fundamentals', 'Create portfolio project', 'Peer review'],
      xpRequired: 350,
      estimatedTime: '10 hours',
      icon: '🎨'
    },
    {
      id: '6',
      title: 'Advanced Game Testing',
      category: 'Quality Assurance',
      difficulty: 'Expert',
      requirements: ['Complete 10 testing projects', 'Submit 50 valid bug reports', 'Lead testing session'],
      xpRequired: 1000,
      estimatedTime: '25 hours',
      icon: '🏆'
    }
  ];

  const getDifficultyColor = (difficulty: string) => {
    switch (difficulty) {
      case 'Beginner': return 'bg-green-600';
      case 'Intermediate': return 'bg-yellow-600';
      case 'Advanced': return 'bg-orange-600';
      case 'Expert': return 'bg-red-600';
      default: return 'bg-gray-600';
    }
  };

  const handleDownloadCertificate = (certificate: Certificate) => {
    // Simulate certificate download
    const link = document.createElement('a');
    link.href = '#';
    link.download = `${certificate.title.replace(/\s+/g, '_')}_Certificate.pdf`;
    link.click();
  };

  const handleShareCertificate = async (certificate: Certificate) => {
    if (navigator.share) {
      await navigator.share({
        title: certificate.title,
        text: `I just earned my ${certificate.title} from SkillArena!`,
        url: certificate.credentialUrl
      });
    } else {
      navigator.clipboard.writeText(certificate.credentialUrl);
      // Show toast notification
    }
  };

  if (selectedCertificate) {
    return (
      <div className="space-y-6">
        <button
          onClick={() => setSelectedCertificate(null)}
          className="text-purple-400 hover:text-purple-300 transition-colors"
        >
          ← Back to Certificates
        </button>

        {/* Certificate Preview */}
        <div className="bg-gradient-to-br from-purple-900 via-blue-900 to-indigo-900 rounded-3xl p-8 border-4 border-gradient-to-r from-gold-400 to-gold-600 shadow-2xl">
          <div className="text-center space-y-6">
            <div className="mx-auto w-20 h-20 bg-gradient-to-r from-gold-400 to-gold-600 rounded-full flex items-center justify-center text-3xl">
              {selectedCertificate.badgeIcon}
            </div>
            
            <div>
              <h1 className="text-4xl font-bold text-white mb-2">Certificate of Completion</h1>
              <p className="text-gold-300 text-lg">SkillArena Learning Platform</p>
            </div>

            <div className="bg-black/20 backdrop-blur-sm rounded-2xl p-6 border border-white/10">
              <p className="text-white text-lg mb-2">This is to certify that</p>
              <h2 className="text-3xl font-bold text-gold-300 mb-4">Alex Chen</h2>
              <p className="text-white text-lg mb-2">has successfully completed</p>
              <h3 className="text-2xl font-bold text-white mb-4">{selectedCertificate.title}</h3>
              
              <div className="grid grid-cols-2 gap-4 text-sm">
                <div>
                  <span className="text-gray-400">Certificate ID:</span>
                  <div className="text-white font-mono">{selectedCertificate.certificateNumber}</div>
                </div>
                <div>
                  <span className="text-gray-400">Issue Date:</span>
                  <div className="text-white">{selectedCertificate.issuedAt.toLocaleDateString()}</div>
                </div>
                <div>
                  <span className="text-gray-400">XP Earned:</span>
                  <div className="text-gold-400 font-semibold">{selectedCertificate.xpEarned} XP</div>
                </div>
                <div>
                  <span className="text-gray-400">Difficulty:</span>
                  <div className="text-white">{selectedCertificate.difficulty}</div>
                </div>
              </div>
            </div>

            <div className="flex justify-center items-center space-x-8 text-sm text-gray-400">
              <div className="text-center">
                <div className="w-16 h-16 bg-gradient-to-r from-purple-500 to-blue-500 rounded-full mx-auto mb-2 flex items-center justify-center">
                  <Award className="h-8 w-8 text-white" />
                </div>
                <div>Digital Signature</div>
              </div>
              <div className="text-center">
                <div className="w-16 h-16 bg-gradient-to-r from-green-500 to-emerald-500 rounded-full mx-auto mb-2 flex items-center justify-center">
                  <CheckCircle className="h-8 w-8 text-white" />
                </div>
                <div>Verified</div>
              </div>
            </div>

            <div className="pt-4 border-t border-white/20">
              <p className="text-xs text-gray-400 mb-2">
                Verify this certificate at: {selectedCertificate.credentialUrl}
              </p>
              <p className="text-xs text-gray-500">
                Hash: {selectedCertificate.verificationHash}
              </p>
            </div>
          </div>
        </div>

        {/* Actions */}
        <div className="flex justify-center space-x-4">
          <button
            onClick={() => handleDownloadCertificate(selectedCertificate)}
            className="bg-gradient-to-r from-blue-600 to-purple-600 text-white px-6 py-3 rounded-xl font-semibold hover:from-blue-700 hover:to-purple-700 transition-all transform hover:scale-105 flex items-center space-x-2"
          >
            <Download className="h-5 w-5" />
            <span>Download PDF</span>
          </button>
          <button
            onClick={() => handleShareCertificate(selectedCertificate)}
            className="bg-gradient-to-r from-green-600 to-emerald-600 text-white px-6 py-3 rounded-xl font-semibold hover:from-green-700 hover:to-emerald-700 transition-all transform hover:scale-105 flex items-center space-x-2"
          >
            <Share2 className="h-5 w-5" />
            <span>Share</span>
          </button>
          <button className="bg-gray-700 hover:bg-gray-600 text-white px-6 py-3 rounded-xl font-semibold transition-all flex items-center space-x-2">
            <ExternalLink className="h-5 w-5" />
            <span>Verify Online</span>
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-white">Certificates & Credentials</h1>
          <p className="text-gray-400 mt-1">Showcase your verified skills and achievements</p>
        </div>
        <div className="flex items-center space-x-2 text-gray-400">
          <Award className="h-5 w-5 text-gold-400" />
          <span>Professional Certifications</span>
        </div>
      </div>

      {/* Stats Overview */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="bg-gradient-to-r from-gold-600 to-yellow-500 rounded-xl p-6 text-white">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-gold-100 text-sm">Certificates Earned</p>
              <p className="text-2xl font-bold">{earnedCertificates.length}</p>
            </div>
            <Award className="h-8 w-8 text-gold-200" />
          </div>
        </div>

        <div className="bg-gradient-to-r from-purple-600 to-blue-500 rounded-xl p-6 text-white">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-purple-100 text-sm">Total XP from Certs</p>
              <p className="text-2xl font-bold">{earnedCertificates.reduce((sum, cert) => sum + cert.xpEarned, 0)}</p>
            </div>
            <Star className="h-8 w-8 text-purple-200" />
          </div>
        </div>

        <div className="bg-gradient-to-r from-green-600 to-emerald-500 rounded-xl p-6 text-white">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-green-100 text-sm">Available to Earn</p>
              <p className="text-2xl font-bold">{availableCertificates.length}</p>
            </div>
            <Trophy className="h-8 w-8 text-green-200" />
          </div>
        </div>
      </div>

      {/* Tab Navigation */}
      <div className="flex space-x-1 bg-gray-800 p-1 rounded-lg">
        {[
          { id: 'earned', label: 'My Certificates', count: earnedCertificates.length },
          { id: 'available', label: 'Available', count: availableCertificates.length },
          { id: 'verification', label: 'Verify Certificate', count: null }
        ].map((tab) => (
          <button
            key={tab.id}
            onClick={() => setSelectedTab(tab.id as any)}
            className={`flex-1 flex items-center justify-center space-x-2 px-4 py-2 rounded-md transition-all duration-200 ${
              selectedTab === tab.id
                ? 'bg-gradient-to-r from-purple-600 to-blue-600 text-white shadow-lg'
                : 'text-gray-400 hover:text-white hover:bg-gray-700'
            }`}
          >
            <span>{tab.label}</span>
            {tab.count !== null && (
              <span className="bg-gray-600 text-xs px-2 py-1 rounded-full">{tab.count}</span>
            )}
          </button>
        ))}
      </div>

      {/* Tab Content */}
      {selectedTab === 'earned' && (
        <div className="space-y-6">
          {earnedCertificates.length === 0 ? (
            <div className="text-center py-12">
              <Award className="h-16 w-16 text-gray-500 mx-auto mb-4" />
              <h3 className="text-xl font-semibold text-gray-400 mb-2">No certificates yet</h3>
              <p className="text-gray-500">Complete skills and challenges to earn your first certificate!</p>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {earnedCertificates.map((certificate) => (
                <div
                  key={certificate.id}
                  onClick={() => setSelectedCertificate(certificate)}
                  className="bg-gradient-to-br from-gray-800 to-gray-900 border border-gold-500/30 rounded-xl p-6 hover:border-gold-400/50 transition-all duration-300 cursor-pointer transform hover:scale-105 hover:shadow-2xl hover:shadow-gold-500/20"
                >
                  <div className="text-center space-y-4">
                    <div className="mx-auto w-16 h-16 bg-gradient-to-r from-gold-400 to-gold-600 rounded-full flex items-center justify-center text-2xl">
                      {certificate.badgeIcon}
                    </div>
                    
                    <div>
                      <h3 className="text-lg font-bold text-white mb-2">{certificate.title}</h3>
                      <p className="text-gray-400 text-sm">{certificate.category}</p>
                    </div>

                    <div className="space-y-2">
                      <span className={`inline-block px-3 py-1 rounded-full text-white text-xs ${getDifficultyColor(certificate.difficulty)}`}>
                        {certificate.difficulty}
                      </span>
                      <div className="text-gold-400 font-semibold">+{certificate.xpEarned} XP</div>
                    </div>

                    <div className="text-gray-400 text-sm">
                      Issued: {certificate.issuedAt.toLocaleDateString()}
                    </div>

                    <div className="flex justify-center space-x-2">
                      <button
                        onClick={(e) => {
                          e.stopPropagation();
                          handleDownloadCertificate(certificate);
                        }}
                        className="bg-blue-600 hover:bg-blue-700 text-white p-2 rounded-lg transition-colors"
                        title="Download"
                      >
                        <Download className="h-4 w-4" />
                      </button>
                      <button
                        onClick={(e) => {
                          e.stopPropagation();
                          handleShareCertificate(certificate);
                        }}
                        className="bg-green-600 hover:bg-green-700 text-white p-2 rounded-lg transition-colors"
                        title="Share"
                      >
                        <Share2 className="h-4 w-4" />
                      </button>
                      <button
                        onClick={(e) => {
                          e.stopPropagation();
                          setSelectedCertificate(certificate);
                        }}
                        className="bg-purple-600 hover:bg-purple-700 text-white p-2 rounded-lg transition-colors"
                        title="View"
                      >
                        <Eye className="h-4 w-4" />
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      )}

      {selectedTab === 'available' && (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {availableCertificates.map((certificate) => (
            <div
              key={certificate.id}
              className="bg-gray-800 border border-gray-700 rounded-xl p-6 hover:bg-gray-700 transition-all duration-300"
            >
              <div className="text-center space-y-4">
                <div className="mx-auto w-16 h-16 bg-gray-600 rounded-full flex items-center justify-center text-2xl opacity-50">
                  {certificate.icon}
                </div>
                
                <div>
                  <h3 className="text-lg font-bold text-white mb-2">{certificate.title}</h3>
                  <p className="text-gray-400 text-sm">{certificate.category}</p>
                </div>

                <span className={`inline-block px-3 py-1 rounded-full text-white text-xs ${getDifficultyColor(certificate.difficulty)}`}>
                  {certificate.difficulty}
                </span>

                <div className="space-y-2 text-sm">
                  <div className="text-gray-400">Requirements:</div>
                  <ul className="text-gray-300 space-y-1">
                    {certificate.requirements.map((req, index) => (
                      <li key={index} className="flex items-start space-x-2">
                        <CheckCircle className="h-4 w-4 text-gray-500 mt-0.5 flex-shrink-0" />
                        <span>{req}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                <div className="flex justify-between text-sm">
                  <span className="text-gray-400">XP Required:</span>
                  <span className="text-yellow-400 font-semibold">{certificate.xpRequired}</span>
                </div>

                <button className="w-full bg-gradient-to-r from-purple-600 to-blue-600 text-white py-2 px-4 rounded-lg font-semibold hover:from-purple-700 hover:to-blue-700 transition-all transform hover:scale-105">
                  Start Earning
                </button>
              </div>
            </div>
          ))}
        </div>
      )}

      {selectedTab === 'verification' && (
        <div className="max-w-2xl mx-auto">
          <div className="bg-black/20 backdrop-blur-xl border border-white/10 rounded-2xl p-8">
            <div className="text-center mb-8">
              <Globe className="h-16 w-16 text-blue-400 mx-auto mb-4" />
              <h2 className="text-2xl font-bold text-white mb-2">Verify Certificate</h2>
              <p className="text-gray-400">Enter a certificate ID or verification hash to verify authenticity</p>
            </div>

            <div className="space-y-6">
              <div>
                <label className="block text-sm font-medium text-gray-400 mb-2">
                  Certificate ID or Verification Hash
                </label>
                <input
                  type="text"
                  placeholder="e.g., SA-RF-2024-001234 or a3b2c1d4e5f6789"
                  className="w-full bg-black/30 backdrop-blur-sm border border-white/10 rounded-xl px-4 py-3 text-white placeholder-gray-400 focus:outline-none focus:border-purple-500 focus:ring-2 focus:ring-purple-500/20"
                />
              </div>

              <button className="w-full bg-gradient-to-r from-blue-600 to-green-600 text-white py-3 px-6 rounded-xl font-semibold hover:from-blue-700 hover:to-green-700 transition-all transform hover:scale-105">
                Verify Certificate
              </button>
            </div>

            <div className="mt-8 bg-gray-800/50 rounded-xl p-6">
              <h3 className="text-lg font-bold text-white mb-4">About Certificate Verification</h3>
              <ul className="space-y-2 text-gray-300 text-sm">
                <li className="flex items-start space-x-2">
                  <CheckCircle className="h-4 w-4 text-green-400 mt-0.5 flex-shrink-0" />
                  <span>All SkillArena certificates are cryptographically signed</span>
                </li>
                <li className="flex items-start space-x-2">
                  <CheckCircle className="h-4 w-4 text-green-400 mt-0.5 flex-shrink-0" />
                  <span>Verification is instant and publicly accessible</span>
                </li>
                <li className="flex items-start space-x-2">
                  <CheckCircle className="h-4 w-4 text-green-400 mt-0.5 flex-shrink-0" />
                  <span>Certificates cannot be forged or tampered with</span>
                </li>
              </ul>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Certificates;