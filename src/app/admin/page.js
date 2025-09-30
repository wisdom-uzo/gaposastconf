"use client";

import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { 
  Users, 
  FileText, 
  BarChart3, 
  Settings, 
  LogOut, 
  Search,
  Filter,
  Download,
  Eye,
  Edit,
  Trash2,
  Calendar,
  Mail,
  Phone,
  MapPin,
  Award,
  Clock,
  CheckCircle,
  XCircle,
  AlertCircle
} from "lucide-react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";

export default function AdminDashboard() {
  const [activeTab, setActiveTab] = useState("overview");
  const [registrations, setRegistrations] = useState([]);
  const [papers, setPapers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState("");
  const [filterStatus, setFilterStatus] = useState("all");
  
  // Modal states
  const [showModal, setShowModal] = useState(false);
  const [modalType, setModalType] = useState(""); // 'view', 'edit', 'delete'
  const [selectedItem, setSelectedItem] = useState(null);
  const [editForm, setEditForm] = useState({});
  const [actionLoading, setActionLoading] = useState(false);

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      setLoading(true);
      
      // Fetch registrations
      const regResponse = await fetch('/api/admin/registrations');
      if (regResponse.ok) {
        const regData = await regResponse.json();
        setRegistrations(regData);
      }

      // Fetch papers
      const papersResponse = await fetch('/api/admin/papers');
      if (papersResponse.ok) {
        const papersData = await papersResponse.json();
        setPapers(papersData);
      }
    } catch (error) {
      console.error('Error fetching data:', error);
    } finally {
      setLoading(false);
    }
  };

  const stats = {
    totalRegistrations: registrations.length,
    totalPapers: papers.length,
    pendingPapers: papers.filter(p => p.status === 'submitted').length,
    approvedPapers: papers.filter(p => p.status === 'approved').length,
  };

  const filteredRegistrations = registrations.filter(reg => 
    reg.fullName?.toLowerCase().includes(searchTerm.toLowerCase()) ||
    reg.email?.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const filteredPapers = papers.filter(paper => {
    const matchesSearch = paper.title?.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         paper.authorName?.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesFilter = filterStatus === 'all' || paper.status === filterStatus;
    return matchesSearch && matchesFilter;
  });

  // Action handlers
  const handleViewItem = (item, type) => {
    setSelectedItem(item);
    setModalType('view');
    setShowModal(true);
  };

  const handleEditItem = (item, type) => {
    setSelectedItem(item);
    setEditForm(item);
    setModalType('edit');
    setShowModal(true);
  };

  const handleDeleteItem = (item, type) => {
    setSelectedItem(item);
    setModalType('delete');
    setShowModal(true);
  };

  const handleUpdateRegistration = async () => {
    setActionLoading(true);
    try {
      const response = await fetch('/api/admin/registrations', {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(editForm),
      });

      if (response.ok) {
        await fetchData();
        setShowModal(false);
        setSelectedItem(null);
        setEditForm({});
      } else {
        alert('Failed to update registration');
      }
    } catch (error) {
      console.error('Error updating registration:', error);
      alert('Error updating registration');
    } finally {
      setActionLoading(false);
    }
  };

  const handleDeleteRegistration = async () => {
    setActionLoading(true);
    try {
      const response = await fetch(`/api/admin/registrations?id=${selectedItem._id}`, {
        method: 'DELETE',
        headers: {
          'Content-Type': 'application/json',
        },
      });

      if (response.ok) {
        await fetchData();
        setShowModal(false);
        setSelectedItem(null);
      } else {
        const errorData = await response.json();
        alert(`Failed to delete registration: ${errorData.error || 'Unknown error'}`);
      }
    } catch (error) {
      console.error('Error deleting registration:', error);
      alert('Error deleting registration');
    } finally {
      setActionLoading(false);
    }
  };

  const handleUpdatePaperStatus = async (status, paperItem = null) => {
    const itemToUpdate = paperItem || selectedItem;
    
    if (!itemToUpdate || !itemToUpdate._id) {
      alert('No paper selected for update');
      return;
    }

    setActionLoading(true);
    try {
      const response = await fetch('/api/admin/papers', {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ 
          id: itemToUpdate._id,
          status: status,
          reviewedAt: new Date().toISOString()
        }),
      });

      if (response.ok) {
        await fetchData();
        setShowModal(false);
        setSelectedItem(null);
      } else {
        const errorData = await response.json();
        alert(`Failed to update paper status: ${errorData.error || 'Unknown error'}`);
      }
    } catch (error) {
      console.error('Error updating paper status:', error);
      alert('Error updating paper status');
    } finally {
      setActionLoading(false);
    }
  };

  const handleDeletePaper = async (paperItem = null) => {
    const itemToDelete = paperItem || selectedItem;
    
    if (!itemToDelete || !itemToDelete._id) {
      alert('No paper selected for deletion');
      return;
    }

    if (!confirm('Are you sure you want to delete this paper? This action cannot be undone.')) {
      return;
    }

    setActionLoading(true);
    try {
      const response = await fetch(`/api/admin/papers?id=${itemToDelete._id}`, {
        method: 'DELETE',
        headers: {
          'Content-Type': 'application/json',
        },
      });

      if (response.ok) {
        await fetchData();
        setShowModal(false);
        setSelectedItem(null);
      } else {
        const errorData = await response.json();
        alert(`Failed to delete paper: ${errorData.error || 'Unknown error'}`);
      }
    } catch (error) {
      console.error('Error deleting paper:', error);
      alert('Error deleting paper');
    } finally {
      setActionLoading(false);
    }
  };

  const handleExportData = (type) => {
    const data = type === 'registrations' ? registrations : papers;
    const csvContent = "data:text/csv;charset=utf-8," + 
      Object.keys(data[0] || {}).join(",") + "\n" +
      data.map(row => Object.values(row).join(",")).join("\n");
    
    const encodedUri = encodeURI(csvContent);
    const link = document.createElement("a");
    link.setAttribute("href", encodedUri);
    link.setAttribute("download", `${type}_export.csv`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  const StatCard = ({ title, value, icon: Icon, color, trend }) => (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className={`bg-white rounded-xl shadow-lg p-6 border-l-4 border-${color}-500`}
    >
      <div className="flex items-center justify-between">
        <div>
          <p className="text-gray-600 text-sm font-medium">{title}</p>
          <p className="text-3xl font-bold text-gray-900 mt-2">{value}</p>
          {trend && (
            <p className={`text-sm mt-2 ${trend > 0 ? 'text-green-600' : 'text-red-600'}`}>
              {trend > 0 ? '+' : ''}{trend}% from last month
            </p>
          )}
        </div>
        <div className={`p-3 bg-${color}-100 rounded-lg`}>
          <Icon className={`w-6 h-6 text-${color}-600`} />
        </div>
      </div>
    </motion.div>
  );

  const TabButton = ({ id, label, icon: Icon, isActive, onClick }) => (
    <motion.button
      whileHover={{ scale: 1.02 }}
      whileTap={{ scale: 0.98 }}
      onClick={() => onClick(id)}
      className={`flex items-center space-x-3 px-6 py-3 rounded-lg font-medium transition-all duration-200 ${
        isActive
          ? 'bg-blue-600 text-white shadow-lg'
          : 'bg-white text-gray-700 hover:bg-gray-50 border border-gray-200'
      }`}
    >
      <Icon className="w-5 h-5" />
      <span>{label}</span>
    </motion.button>
  );

  // Modal Component
  const Modal = ({ isOpen, onClose, children }) => {
    if (!isOpen) return null;

    return (
      <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0, scale: 0.95 }}
          className="bg-white rounded-xl shadow-xl max-w-2xl w-full max-h-[90vh] overflow-y-auto"
        >
          <div className="p-6">
            <div className="flex justify-between items-center mb-4">
              <h3 className="text-xl font-bold text-gray-900">
                {modalType === 'view' ? 'View Details' : 
                 modalType === 'edit' ? 'Edit Record' : 
                 'Confirm Delete'}
              </h3>
              <button
                onClick={onClose}
                className="text-gray-400 hover:text-gray-600"
              >
                <XCircle className="w-6 h-6" />
              </button>
            </div>
            {children}
          </div>
        </motion.div>
      </div>
    );
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <Header />
      
      <div className="pt-20">
        {/* Admin Header */}
        <div className="bg-gradient-to-r from-blue-600 to-purple-600 text-white py-12">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="text-center"
            >
              <h1 className="text-4xl font-bold mb-4">Admin Dashboard</h1>
              <p className="text-xl opacity-90">Manage conference registrations and paper submissions</p>
            </motion.div>
          </div>
        </div>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          {/* Navigation Tabs */}
          <div className="flex flex-wrap gap-4 mb-8">
            <TabButton
              id="overview"
              label="Overview"
              icon={BarChart3}
              isActive={activeTab === "overview"}
              onClick={setActiveTab}
            />
            <TabButton
              id="registrations"
              label="Registrations"
              icon={Users}
              isActive={activeTab === "registrations"}
              onClick={setActiveTab}
            />
            <TabButton
              id="papers"
              label="Paper Submissions"
              icon={FileText}
              isActive={activeTab === "papers"}
              onClick={setActiveTab}
            />
            <TabButton
              id="settings"
              label="Settings"
              icon={Settings}
              isActive={activeTab === "settings"}
              onClick={setActiveTab}
            />
          </div>

          {/* Overview Tab */}
          {activeTab === "overview" && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="space-y-8"
            >
              {/* Stats Grid */}
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                <StatCard
                  title="Total Registrations"
                  value={stats.totalRegistrations}
                  icon={Users}
                  color="blue"
                  trend={12}
                />
                <StatCard
                  title="Paper Submissions"
                  value={stats.totalPapers}
                  icon={FileText}
                  color="green"
                  trend={8}
                />
                <StatCard
                  title="Pending Reviews"
                  value={stats.pendingPapers}
                  icon={Clock}
                  color="yellow"
                  trend={-5}
                />
                <StatCard
                  title="Approved Papers"
                  value={stats.approvedPapers}
                  icon={CheckCircle}
                  color="emerald"
                  trend={15}
                />
              </div>

              {/* Recent Activity */}
              <div className="bg-white rounded-xl shadow-lg p-6">
                <h3 className="text-xl font-bold text-gray-900 mb-6">Recent Activity</h3>
                <div className="space-y-4">
                  {registrations.slice(0, 5).map((reg, index) => (
                    <div key={index} className="flex items-center space-x-4 p-4 bg-gray-50 rounded-lg">
                      <div className="w-10 h-10 bg-blue-100 rounded-full flex items-center justify-center">
                        <Users className="w-5 h-5 text-blue-600" />
                      </div>
                      <div className="flex-1">
                        <p className="font-medium text-gray-900">{reg.fullName}</p>
                        <p className="text-sm text-gray-600">New registration</p>
                      </div>
                      <div className="text-sm text-gray-500">
                        {new Date(reg.createdAt).toLocaleDateString()}
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </motion.div>
          )}

          {/* Registrations Tab */}
          {activeTab === "registrations" && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="space-y-6"
            >
              {/* Search and Filter */}
              <div className="bg-white rounded-xl shadow-lg p-6">
                <div className="flex flex-col md:flex-row gap-4">
                  <div className="flex-1 relative">
                    <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                    <input
                      type="text"
                      placeholder="Search registrations..."
                      value={searchTerm}
                      onChange={(e) => setSearchTerm(e.target.value)}
                      className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    />
                  </div>
                  <button 
                    onClick={() => handleExportData('registrations')}
                    className="flex items-center space-x-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
                  >
                    <Download className="w-4 h-4" />
                    <span>Export</span>
                  </button>
                </div>
              </div>

              {/* Registrations Table */}
              <div className="bg-white rounded-xl shadow-lg overflow-hidden">
                <div className="overflow-x-auto">
                  <table className="w-full">
                    <thead className="bg-gray-50">
                      <tr>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                          Participant
                        </th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                          Contact
                        </th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                          Registration Type
                        </th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                          Date
                        </th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                          Actions
                        </th>
                      </tr>
                    </thead>
                    <tbody className="bg-white divide-y divide-gray-200">
                      {loading ? (
                        <tr>
                          <td colSpan="5" className="px-6 py-4 text-center text-gray-500">
                            Loading registrations...
                          </td>
                        </tr>
                      ) : filteredRegistrations.length === 0 ? (
                        <tr>
                          <td colSpan="5" className="px-6 py-4 text-center text-gray-500">
                            No registrations found
                          </td>
                        </tr>
                      ) : (
                        filteredRegistrations.map((reg, index) => (
                          <tr key={index} className="hover:bg-gray-50">
                            <td className="px-6 py-4 whitespace-nowrap">
                              <div className="flex items-center">
                                <div className="w-10 h-10 bg-blue-100 rounded-full flex items-center justify-center">
                                  <Users className="w-5 h-5 text-blue-600" />
                                </div>
                                <div className="ml-4">
                                  <div className="text-sm font-medium text-gray-900">{reg.fullName}</div>
                                  <div className="text-sm text-gray-500">{reg.institution}</div>
                                </div>
                              </div>
                            </td>
                            <td className="px-6 py-4 whitespace-nowrap">
                              <div className="text-sm text-gray-900">{reg.email}</div>
                              <div className="text-sm text-gray-500">{reg.phone}</div>
                            </td>
                            <td className="px-6 py-4 whitespace-nowrap">
                              <span className="inline-flex px-2 py-1 text-xs font-semibold rounded-full bg-blue-100 text-blue-800">
                                {reg.registrationType}
                              </span>
                            </td>
                            <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                              {new Date(reg.createdAt).toLocaleDateString()}
                            </td>
                            <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                              <div className="flex space-x-2">
                                <button 
                                  onClick={() => handleViewItem(reg, 'registration')}
                                  className="text-blue-600 hover:text-blue-900"
                                  title="View Details"
                                >
                                  <Eye className="w-4 h-4" />
                                </button>
                                <button 
                                  onClick={() => handleEditItem(reg, 'registration')}
                                  className="text-green-600 hover:text-green-900"
                                  title="Edit Registration"
                                >
                                  <Edit className="w-4 h-4" />
                                </button>
                                <button 
                                  onClick={() => handleDeleteItem(reg, 'registration')}
                                  className="text-red-600 hover:text-red-900"
                                  title="Delete Registration"
                                >
                                  <Trash2 className="w-4 h-4" />
                                </button>
                              </div>
                            </td>
                          </tr>
                        ))
                      )}
                    </tbody>
                  </table>
                </div>
              </div>
            </motion.div>
          )}

          {/* Papers Tab */}
          {activeTab === "papers" && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="space-y-6"
            >
              {/* Search and Filter */}
              <div className="bg-white rounded-xl shadow-lg p-6">
                <div className="flex flex-col md:flex-row gap-4">
                  <div className="flex-1 relative">
                    <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                    <input
                      type="text"
                      placeholder="Search papers..."
                      value={searchTerm}
                      onChange={(e) => setSearchTerm(e.target.value)}
                      className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    />
                  </div>
                  <select
                    value={filterStatus}
                    onChange={(e) => setFilterStatus(e.target.value)}
                    className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  >
                    <option value="all">All Status</option>
                    <option value="submitted">Submitted</option>
                    <option value="under_review">Under Review</option>
                    <option value="approved">Approved</option>
                    <option value="rejected">Rejected</option>
                  </select>
                  <button 
                    onClick={() => handleExportData('papers')}
                    className="flex items-center space-x-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
                  >
                    <Download className="w-4 h-4" />
                    <span>Export</span>
                  </button>
                </div>
              </div>

              {/* Papers Table */}
              <div className="bg-white rounded-xl shadow-lg overflow-hidden">
                <div className="overflow-x-auto">
                  <table className="w-full">
                    <thead className="bg-gray-50">
                      <tr>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                          Paper
                        </th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                          Author
                        </th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                          Status
                        </th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                          Submitted
                        </th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                          Actions
                        </th>
                      </tr>
                    </thead>
                    <tbody className="bg-white divide-y divide-gray-200">
                      {loading ? (
                        <tr>
                          <td colSpan="5" className="px-6 py-4 text-center text-gray-500">
                            Loading papers...
                          </td>
                        </tr>
                      ) : filteredPapers.length === 0 ? (
                        <tr>
                          <td colSpan="5" className="px-6 py-4 text-center text-gray-500">
                            No papers found
                          </td>
                        </tr>
                      ) : (
                        filteredPapers.map((paper, index) => (
                          <tr key={index} className="hover:bg-gray-50">
                            <td className="px-6 py-4">
                              <div className="text-sm font-medium text-gray-900">{paper.title}</div>
                              <div className="text-sm text-gray-500">{paper.subtheme}</div>
                            </td>
                            <td className="px-6 py-4 whitespace-nowrap">
                              <div className="text-sm text-gray-900">{paper.authorName}</div>
                              <div className="text-sm text-gray-500">{paper.authorEmail}</div>
                            </td>
                            <td className="px-6 py-4 whitespace-nowrap">
                              <span className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${
                                paper.status === 'approved' ? 'bg-green-100 text-green-800' :
                                paper.status === 'rejected' ? 'bg-red-100 text-red-800' :
                                paper.status === 'under_review' ? 'bg-yellow-100 text-yellow-800' :
                                'bg-gray-100 text-gray-800'
                              }`}>
                                {paper.status?.replace('_', ' ') || 'submitted'}
                              </span>
                            </td>
                            <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                              {new Date(paper.createdAt).toLocaleDateString()}
                            </td>
                            <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                              <div className="flex space-x-2">
                                <button 
                                  onClick={() => handleViewItem(paper, 'paper')}
                                  className="text-blue-600 hover:text-blue-900"
                                  title="View Paper Details"
                                >
                                  <Eye className="w-4 h-4" />
                                </button>
                                <button 
                                  onClick={() => {
                                    handleUpdatePaperStatus('approved', paper);
                                  }}
                                  className="text-green-600 hover:text-green-900"
                                  title="Approve Paper"
                                >
                                  <CheckCircle className="w-4 h-4" />
                                </button>
                                <button 
                                  onClick={() => {
                                    handleUpdatePaperStatus('rejected', paper);
                                  }}
                                  className="text-red-600 hover:text-red-900"
                                  title="Reject Paper"
                                >
                                  <XCircle className="w-4 h-4" />
                                </button>
                                <button 
                                  onClick={() => {
                                    handleDeletePaper(paper);
                                  }}
                                  className="text-red-600 hover:text-red-900"
                                  title="Delete Paper"
                                >
                                  <Trash2 className="w-4 h-4" />
                                </button>
                              </div>
                            </td>
                          </tr>
                        ))
                      )}
                    </tbody>
                  </table>
                </div>
              </div>
            </motion.div>
          )}

          {/* Settings Tab */}
          {activeTab === "settings" && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="space-y-6"
            >
              <div className="bg-white rounded-xl shadow-lg p-6">
                <h3 className="text-xl font-bold text-gray-900 mb-6">Admin Settings</h3>
                <div className="space-y-4">
                  <div className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
                    <div>
                      <h4 className="font-medium text-gray-900">Export Data</h4>
                      <p className="text-sm text-gray-600">Download all registrations and submissions</p>
                    </div>
                    <button className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors">
                      Export All
                    </button>
                  </div>
                  <div className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
                    <div>
                      <h4 className="font-medium text-gray-900">System Backup</h4>
                      <p className="text-sm text-gray-600">Create a backup of all data</p>
                    </div>
                    <button className="px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors">
                      Backup Now
                    </button>
                  </div>
                </div>
              </div>
            </motion.div>
          )}
        </div>
      </div>

      {/* Modal */}
      <Modal isOpen={showModal} onClose={() => setShowModal(false)}>
        {modalType === 'view' && selectedItem && (
          <div className="space-y-4">
            {activeTab === 'registrations' ? (
              <>
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700">Full Name</label>
                    <p className="mt-1 text-sm text-gray-900">{selectedItem.fullName}</p>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700">Email</label>
                    <p className="mt-1 text-sm text-gray-900">{selectedItem.email}</p>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700">Phone</label>
                    <p className="mt-1 text-sm text-gray-900">{selectedItem.phone}</p>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700">Institution</label>
                    <p className="mt-1 text-sm text-gray-900">{selectedItem.institution}</p>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700">Registration Type</label>
                    <p className="mt-1 text-sm text-gray-900">{selectedItem.registrationType}</p>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700">Registration Date</label>
                    <p className="mt-1 text-sm text-gray-900">
                      {new Date(selectedItem.createdAt).toLocaleDateString()}
                    </p>
                  </div>
                </div>
              </>
            ) : (
              <>
                <div className="space-y-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700">Paper Title</label>
                    <p className="mt-1 text-sm text-gray-900">{selectedItem.title}</p>
                  </div>
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700">Author Name</label>
                      <p className="mt-1 text-sm text-gray-900">{selectedItem.authorName}</p>
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700">Author Email</label>
                      <p className="mt-1 text-sm text-gray-900">{selectedItem.authorEmail}</p>
                    </div>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700">Subtheme</label>
                    <p className="mt-1 text-sm text-gray-900">{selectedItem.subtheme}</p>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700">Abstract</label>
                    <p className="mt-1 text-sm text-gray-900 max-h-32 overflow-y-auto">
                      {selectedItem.abstract}
                    </p>
                  </div>
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700">Status</label>
                      <span className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${
                        selectedItem.status === 'approved' ? 'bg-green-100 text-green-800' :
                        selectedItem.status === 'rejected' ? 'bg-red-100 text-red-800' :
                        selectedItem.status === 'under_review' ? 'bg-yellow-100 text-yellow-800' :
                        'bg-gray-100 text-gray-800'
                      }`}>
                        {selectedItem.status?.replace('_', ' ') || 'submitted'}
                      </span>
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700">Submitted Date</label>
                      <p className="mt-1 text-sm text-gray-900">
                        {new Date(selectedItem.createdAt).toLocaleDateString()}
                      </p>
                    </div>
                  </div>
                </div>
              </>
            )}
          </div>
        )}

        {modalType === 'edit' && selectedItem && activeTab === 'registrations' && (
          <div className="space-y-4">
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700">Full Name</label>
                <input
                  type="text"
                  value={editForm.fullName || ''}
                  onChange={(e) => setEditForm({...editForm, fullName: e.target.value})}
                  className="mt-1 block w-full border border-gray-300 rounded-md px-3 py-2 focus:ring-blue-500 focus:border-blue-500"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700">Email</label>
                <input
                  type="email"
                  value={editForm.email || ''}
                  onChange={(e) => setEditForm({...editForm, email: e.target.value})}
                  className="mt-1 block w-full border border-gray-300 rounded-md px-3 py-2 focus:ring-blue-500 focus:border-blue-500"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700">Phone</label>
                <input
                  type="tel"
                  value={editForm.phone || ''}
                  onChange={(e) => setEditForm({...editForm, phone: e.target.value})}
                  className="mt-1 block w-full border border-gray-300 rounded-md px-3 py-2 focus:ring-blue-500 focus:border-blue-500"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700">Institution</label>
                <input
                  type="text"
                  value={editForm.institution || ''}
                  onChange={(e) => setEditForm({...editForm, institution: e.target.value})}
                  className="mt-1 block w-full border border-gray-300 rounded-md px-3 py-2 focus:ring-blue-500 focus:border-blue-500"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700">Registration Type</label>
                <select
                  value={editForm.registrationType || ''}
                  onChange={(e) => setEditForm({...editForm, registrationType: e.target.value})}
                  className="mt-1 block w-full border border-gray-300 rounded-md px-3 py-2 focus:ring-blue-500 focus:border-blue-500"
                >
                  <option value="student">Student</option>
                  <option value="academic">Academic</option>
                  <option value="professional">Professional</option>
                </select>
              </div>
            </div>
            <div className="flex justify-end space-x-3 pt-4">
              <button
                onClick={() => setShowModal(false)}
                className="px-4 py-2 text-gray-700 bg-gray-200 rounded-lg hover:bg-gray-300 transition-colors"
              >
                Cancel
              </button>
              <button
                onClick={handleUpdateRegistration}
                disabled={actionLoading}
                className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors disabled:opacity-50"
              >
                {actionLoading ? 'Updating...' : 'Update Registration'}
              </button>
            </div>
          </div>
        )}

        {modalType === 'delete' && selectedItem && (
          <div className="space-y-4">
            <div className="flex items-center space-x-3">
              <AlertCircle className="w-8 h-8 text-red-500" />
              <div>
                <h4 className="text-lg font-medium text-gray-900">Confirm Delete</h4>
                <p className="text-sm text-gray-600">
                  Are you sure you want to delete this {activeTab === 'registrations' ? 'registration' : 'paper'}? 
                  This action cannot be undone.
                </p>
              </div>
            </div>
            <div className="bg-gray-50 p-4 rounded-lg">
              <p className="text-sm font-medium text-gray-900">
                {activeTab === 'registrations' ? selectedItem.fullName : selectedItem.title}
              </p>
              <p className="text-sm text-gray-600">
                {activeTab === 'registrations' ? selectedItem.email : selectedItem.authorName}
              </p>
            </div>
            <div className="flex justify-end space-x-3 pt-4">
              <button
                onClick={() => setShowModal(false)}
                className="px-4 py-2 text-gray-700 bg-gray-200 rounded-lg hover:bg-gray-300 transition-colors"
              >
                Cancel
              </button>
              <button
                onClick={activeTab === 'registrations' ? handleDeleteRegistration : handleDeletePaper}
                disabled={actionLoading}
                className="px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors disabled:opacity-50"
              >
                {actionLoading ? 'Deleting...' : 'Delete'}
              </button>
            </div>
          </div>
        )}
      </Modal>

      <Footer />
    </div>
  );
}