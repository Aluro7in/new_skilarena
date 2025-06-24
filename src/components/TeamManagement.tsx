import React, { useState, useEffect } from 'react';
import { Users, UserPlus, Settings, Crown, Shield, User, Mail, Calendar, MoreVertical, X, Check, AlertCircle } from 'lucide-react';
import { subscriptionService } from '../services/subscriptionService';
import { TeamSubscription } from '../types/subscription';

const TeamManagement: React.FC = () => {
  const [team, setTeam] = useState<TeamSubscription | null>(null);
  const [showInviteModal, setShowInviteModal] = useState(false);
  const [showSettingsModal, setShowSettingsModal] = useState(false);
  const [inviteEmail, setInviteEmail] = useState('');
  const [inviteRole, setInviteRole] = useState<'member' | 'admin'>('member');
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadTeamData();
  }, []);

  const loadTeamData = async () => {
    try {
      // Mock team data for demonstration
      const mockTeam: TeamSubscription = {
        id: 'team-1',
        name: 'SkillArena Learning Team',
        ownerId: 'user-1',
        adminIds: ['user-1', 'user-2'],
        memberIds: ['user-1', 'user-2', 'user-3', 'user-4', 'user-5'],
        maxMembers: 50,
        subscription: await subscriptionService.getCurrentUserSubscription(),
        settings: {
          allowMemberInvites: true,
          requireApproval: false,
          defaultRole: 'member',
          features: {
            enableAnalytics: true,
            enableCustomBranding: true,
            enableApiAccess: false,
          },
        },
        createdAt: new Date('2024-01-15'),
        updatedAt: new Date(),
      };
      setTeam(mockTeam);
    } catch (error) {
      console.error('Error loading team data:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleInviteMember = async () => {
    if (!inviteEmail.trim() || !team) return;

    try {
      await subscriptionService.inviteTeamMember(team.id, inviteEmail, inviteRole);
      setInviteEmail('');
      setInviteRole('member');
      setShowInviteModal(false);
      // Refresh team data
      await loadTeamData();
    } catch (error) {
      console.error('Error inviting member:', error);
    }
  };

  const handleRemoveMember = async (userId: string) => {
    if (!team) return;

    try {
      await subscriptionService.removeTeamMember(team.id, userId);
      await loadTeamData();
    } catch (error) {
      console.error('Error removing member:', error);
    }
  };

  const handleUpdateSettings = async (newSettings: Partial<TeamSubscription['settings']>) => {
    if (!team) return;

    try {
      await subscriptionService.updateTeamSettings(team.id, newSettings);
      setTeam({ ...team, settings: { ...team.settings, ...newSettings } });
    } catch (error) {
      console.error('Error updating settings:', error);
    }
  };

  const mockMembers = [
    { id: 'user-1', name: 'Alex Chen', email: 'alex@example.com', role: 'owner', avatar: 'https://images.pexels.com/photos/1722198/pexels-photo-1722198.jpeg?auto=compress&cs=tinysrgb&w=150', lastActive: new Date(), progress: 85 },
    { id: 'user-2', name: 'Sarah Johnson', email: 'sarah@example.com', role: 'admin', avatar: 'https://images.pexels.com/photos/1239291/pexels-photo-1239291.jpeg?auto=compress&cs=tinysrgb&w=150', lastActive: new Date(Date.now() - 2 * 60 * 60 * 1000), progress: 92 },
    { id: 'user-3', name: 'Marcus Rodriguez', email: 'marcus@example.com', role: 'member', avatar: 'https://images.pexels.com/photos/220453/pexels-photo-220453.jpeg?auto=compress&cs=tinysrgb&w=150', lastActive: new Date(Date.now() - 24 * 60 * 60 * 1000), progress: 67 },
    { id: 'user-4', name: 'Emily Davis', email: 'emily@example.com', role: 'member', avatar: 'https://images.pexels.com/photos/1065084/pexels-photo-1065084.jpeg?auto=compress&cs=tinysrgb&w=150', lastActive: new Date(Date.now() - 3 * 24 * 60 * 60 * 1000), progress: 78 },
    { id: 'user-5', name: 'David Kim', email: 'david@example.com', role: 'member', avatar: 'https://images.pexels.com/photos/1516680/pexels-photo-1516680.jpeg?auto=compress&cs=tinysrgb&w=150', lastActive: new Date(Date.now() - 7 * 24 * 60 * 60 * 1000), progress: 45 },
  ];

  if (loading) {
    return (
      <div className="flex items-center justify-center p-8">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-purple-500"></div>
      </div>
    );
  }

  if (!team) {
    return (
      <div className="text-center py-12">
        <Users className="h-16 w-16 text-gray-500 mx-auto mb-4" />
        <h3 className="text-xl font-semibold text-gray-400 mb-2">No Team Found</h3>
        <p className="text-gray-500 mb-6">Create or join a team to access collaborative features.</p>
        <button className="bg-gradient-to-r from-purple-600 to-blue-600 text-white px-6 py-3 rounded-xl font-semibold hover:from-purple-700 hover:to-blue-700 transition-all transform hover:scale-105">
          Create Team
        </button>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-white">Team Management</h1>
          <p className="text-gray-400 mt-1">Manage your team members and collaboration settings</p>
        </div>
        <div className="flex space-x-4">
          <button
            onClick={() => setShowSettingsModal(true)}
            className="bg-gray-700 hover:bg-gray-600 text-white px-4 py-2 rounded-lg transition-colors flex items-center space-x-2"
          >
            <Settings className="h-4 w-4" />
            <span>Settings</span>
          </button>
          <button
            onClick={() => setShowInviteModal(true)}
            className="bg-gradient-to-r from-purple-600 to-blue-600 text-white px-4 py-2 rounded-lg font-semibold hover:from-purple-700 hover:to-blue-700 transition-all transform hover:scale-105 flex items-center space-x-2"
          >
            <UserPlus className="h-4 w-4" />
            <span>Invite Member</span>
          </button>
        </div>
      </div>

      {/* Team Overview */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <div className="bg-gradient-to-r from-blue-600 to-cyan-500 rounded-xl p-6 text-white">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-blue-100 text-sm">Total Members</p>
              <p className="text-2xl font-bold">{mockMembers.length}</p>
            </div>
            <Users className="h-8 w-8 text-blue-200" />
          </div>
        </div>

        <div className="bg-gradient-to-r from-green-600 to-emerald-500 rounded-xl p-6 text-white">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-green-100 text-sm">Active Members</p>
              <p className="text-2xl font-bold">{mockMembers.filter(m => m.lastActive > new Date(Date.now() - 7 * 24 * 60 * 60 * 1000)).length}</p>
            </div>
            <Shield className="h-8 w-8 text-green-200" />
          </div>
        </div>

        <div className="bg-gradient-to-r from-purple-600 to-pink-500 rounded-xl p-6 text-white">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-purple-100 text-sm">Avg Progress</p>
              <p className="text-2xl font-bold">{Math.round(mockMembers.reduce((sum, m) => sum + m.progress, 0) / mockMembers.length)}%</p>
            </div>
            <Crown className="h-8 w-8 text-purple-200" />
          </div>
        </div>

        <div className="bg-gradient-to-r from-orange-600 to-red-500 rounded-xl p-6 text-white">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-orange-100 text-sm">Available Seats</p>
              <p className="text-2xl font-bold">{team.maxMembers - mockMembers.length}</p>
            </div>
            <UserPlus className="h-8 w-8 text-orange-200" />
          </div>
        </div>
      </div>

      {/* Team Members */}
      <div className="bg-black/20 backdrop-blur-xl border border-white/10 rounded-2xl p-6">
        <h2 className="text-xl font-bold text-white mb-6">Team Members</h2>
        <div className="space-y-4">
          {mockMembers.map((member) => (
            <div key={member.id} className="bg-gray-800/50 rounded-xl p-4 flex items-center justify-between">
              <div className="flex items-center space-x-4">
                <img
                  src={member.avatar}
                  alt={member.name}
                  className="w-12 h-12 rounded-full"
                />
                <div>
                  <div className="flex items-center space-x-2">
                    <h3 className="font-semibold text-white">{member.name}</h3>
                    {member.role === 'owner' && <Crown className="h-4 w-4 text-yellow-400" />}
                    {member.role === 'admin' && <Shield className="h-4 w-4 text-blue-400" />}
                  </div>
                  <p className="text-gray-400 text-sm">{member.email}</p>
                </div>
              </div>

              <div className="flex items-center space-x-6">
                <div className="text-right">
                  <div className="text-sm font-medium text-white">{member.progress}% Complete</div>
                  <div className="text-xs text-gray-400">
                    Last active: {member.lastActive.toLocaleDateString()}
                  </div>
                </div>
                
                <div className="flex items-center space-x-2">
                  <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                    member.role === 'owner' ? 'bg-yellow-600 text-white' :
                    member.role === 'admin' ? 'bg-blue-600 text-white' :
                    'bg-gray-600 text-white'
                  }`}>
                    {member.role}
                  </span>
                  
                  {member.role !== 'owner' && (
                    <button
                      onClick={() => handleRemoveMember(member.id)}
                      className="text-gray-400 hover:text-red-400 transition-colors"
                    >
                      <X className="h-4 w-4" />
                    </button>
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Invite Member Modal */}
      {showInviteModal && (
        <div className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4">
          <div className="bg-gray-800 rounded-2xl p-8 max-w-md w-full">
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-xl font-bold text-white">Invite Team Member</h2>
              <button
                onClick={() => setShowInviteModal(false)}
                className="text-gray-400 hover:text-white transition-colors"
              >
                <X className="h-6 w-6" />
              </button>
            </div>

            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-400 mb-2">
                  Email Address
                </label>
                <input
                  type="email"
                  value={inviteEmail}
                  onChange={(e) => setInviteEmail(e.target.value)}
                  placeholder="Enter email address"
                  className="w-full bg-gray-700 border border-gray-600 rounded-lg px-3 py-2 text-white placeholder-gray-400 focus:outline-none focus:border-purple-500"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-400 mb-2">
                  Role
                </label>
                <select
                  value={inviteRole}
                  onChange={(e) => setInviteRole(e.target.value as 'member' | 'admin')}
                  className="w-full bg-gray-700 border border-gray-600 rounded-lg px-3 py-2 text-white focus:outline-none focus:border-purple-500"
                >
                  <option value="member">Member</option>
                  <option value="admin">Admin</option>
                </select>
              </div>
            </div>

            <div className="flex justify-end space-x-4 mt-6">
              <button
                onClick={() => setShowInviteModal(false)}
                className="bg-gray-600 hover:bg-gray-700 text-white px-4 py-2 rounded-lg transition-colors"
              >
                Cancel
              </button>
              <button
                onClick={handleInviteMember}
                disabled={!inviteEmail.trim()}
                className="bg-gradient-to-r from-purple-600 to-blue-600 text-white px-4 py-2 rounded-lg font-semibold hover:from-purple-700 hover:to-blue-700 transition-all transform hover:scale-105 disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none"
              >
                Send Invite
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Settings Modal */}
      {showSettingsModal && (
        <div className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4">
          <div className="bg-gray-800 rounded-2xl p-8 max-w-2xl w-full max-h-[90vh] overflow-y-auto">
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-xl font-bold text-white">Team Settings</h2>
              <button
                onClick={() => setShowSettingsModal(false)}
                className="text-gray-400 hover:text-white transition-colors"
              >
                <X className="h-6 w-6" />
              </button>
            </div>

            <div className="space-y-6">
              <div>
                <h3 className="text-lg font-semibold text-white mb-4">General Settings</h3>
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <div>
                      <div className="font-medium text-white">Allow Member Invites</div>
                      <div className="text-sm text-gray-400">Let members invite new team members</div>
                    </div>
                    <button
                      onClick={() => handleUpdateSettings({ 
                        allowMemberInvites: !team.settings.allowMemberInvites 
                      })}
                      className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors ${
                        team.settings.allowMemberInvites ? 'bg-purple-600' : 'bg-gray-600'
                      }`}
                    >
                      <span
                        className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${
                          team.settings.allowMemberInvites ? 'translate-x-6' : 'translate-x-1'
                        }`}
                      />
                    </button>
                  </div>

                  <div className="flex items-center justify-between">
                    <div>
                      <div className="font-medium text-white">Require Approval</div>
                      <div className="text-sm text-gray-400">New members need admin approval</div>
                    </div>
                    <button
                      onClick={() => handleUpdateSettings({ 
                        requireApproval: !team.settings.requireApproval 
                      })}
                      className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors ${
                        team.settings.requireApproval ? 'bg-purple-600' : 'bg-gray-600'
                      }`}
                    >
                      <span
                        className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${
                          team.settings.requireApproval ? 'translate-x-6' : 'translate-x-1'
                        }`}
                      />
                    </button>
                  </div>
                </div>
              </div>

              <div>
                <h3 className="text-lg font-semibold text-white mb-4">Feature Settings</h3>
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <div>
                      <div className="font-medium text-white">Advanced Analytics</div>
                      <div className="text-sm text-gray-400">Enable detailed team progress analytics</div>
                    </div>
                    <button
                      onClick={() => handleUpdateSettings({ 
                        features: { ...team.settings.features, enableAnalytics: !team.settings.features.enableAnalytics }
                      })}
                      className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors ${
                        team.settings.features.enableAnalytics ? 'bg-purple-600' : 'bg-gray-600'
                      }`}
                    >
                      <span
                        className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${
                          team.settings.features.enableAnalytics ? 'translate-x-6' : 'translate-x-1'
                        }`}
                      />
                    </button>
                  </div>

                  <div className="flex items-center justify-between">
                    <div>
                      <div className="font-medium text-white">Custom Branding</div>
                      <div className="text-sm text-gray-400">Customize team workspace appearance</div>
                    </div>
                    <button
                      onClick={() => handleUpdateSettings({ 
                        features: { ...team.settings.features, enableCustomBranding: !team.settings.features.enableCustomBranding }
                      })}
                      className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors ${
                        team.settings.features.enableCustomBranding ? 'bg-purple-600' : 'bg-gray-600'
                      }`}
                    >
                      <span
                        className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${
                          team.settings.features.enableCustomBranding ? 'translate-x-6' : 'translate-x-1'
                        }`}
                      />
                    </button>
                  </div>

                  <div className="flex items-center justify-between">
                    <div>
                      <div className="font-medium text-white">API Access</div>
                      <div className="text-sm text-gray-400">Enable API integration capabilities</div>
                    </div>
                    <button
                      onClick={() => handleUpdateSettings({ 
                        features: { ...team.settings.features, enableApiAccess: !team.settings.features.enableApiAccess }
                      })}
                      className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors ${
                        team.settings.features.enableApiAccess ? 'bg-purple-600' : 'bg-gray-600'
                      }`}
                    >
                      <span
                        className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${
                          team.settings.features.enableApiAccess ? 'translate-x-6' : 'translate-x-1'
                        }`}
                      />
                    </button>
                  </div>
                </div>
              </div>
            </div>

            <div className="flex justify-end mt-6">
              <button
                onClick={() => setShowSettingsModal(false)}
                className="bg-gradient-to-r from-purple-600 to-blue-600 text-white px-6 py-2 rounded-lg font-semibold hover:from-purple-700 hover:to-blue-700 transition-all transform hover:scale-105"
              >
                Save Changes
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default TeamManagement;