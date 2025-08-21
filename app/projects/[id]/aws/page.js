// app/projects/[id]/aws/page.js
'use client';

import { useState, useEffect } from 'react';
import { 
  Cloud, 
  Server, 
  Database, 
  Globe, 
  Shield, 
  Activity,
  DollarSign,
  AlertCircle,
  TrendingUp,
  HardDrive,
  Cpu,
  Zap,
  RefreshCw
} from 'lucide-react';

export default function AWSResourcesPage() {
  const [resources, setResources] = useState({
    ec2: [],
    s3: []
  });
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const fetchAWSResources = async () => {
    setLoading(true);
    try {
      const response = await fetch('/api/aws/resources');
      if (!response.ok) throw new Error('Failed to fetch AWS resources');
      const data = await response.json();
      
      // Process EC2 instances
      const instances = [];
      data.instances?.forEach(reservation => {
        reservation.Instances?.forEach(instance => {
          instances.push({
            id: instance.InstanceId,
            name: instance.Tags?.find(tag => tag.Key === 'Name')?.Value || 'Unnamed',
            type: instance.InstanceType,
            status: instance.State.Name,
            region: instance.Placement?.AvailabilityZone
          });
        });
      });

      // Process S3 buckets
      const buckets = data.buckets?.map(bucket => ({
        name: bucket.Name,
        createdAt: bucket.CreationDate
      })) || [];

      setResources({
        ec2: instances,
        s3: buckets
      });
      setError(null);
    } catch (err) {
      setError(err.message);
      console.error('Error fetching AWS resources:', err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchAWSResources();
  }, []);

  if (loading) {
    return (
      <div className="flex items-center justify-center py-12">
        <RefreshCw className="w-8 h-8 text-blue-500 animate-spin" />
        <span className="ml-3 text-white">Loading AWS resources...</span>
      </div>
    );
  }

  if (error) {
    return (
      <div className="bg-red-900/20 border border-red-700/50 rounded-lg p-4">
        <div className="flex items-center gap-2 text-red-400">
          <AlertCircle className="w-5 h-5" />
          <span>Error: {error}</span>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex justify-between items-center">
        <div>
          <h2 className="text-3xl font-bold text-white mb-2">AWS Resources</h2>
          <p className="text-gray-400">Live data from your AWS account</p>
        </div>
        <button 
          onClick={fetchAWSResources}
          className="flex items-center gap-2 px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg transition-colors"
        >
          <RefreshCw className="w-4 h-4" />
          Refresh
        </button>
      </div>

      {/* EC2 Instances */}
      <div className="bg-gray-800/50 backdrop-blur-sm rounded-xl p-6 border border-gray-700/50">
        <h3 className="text-lg font-semibold text-white mb-4 flex items-center gap-2">
          <Server className="w-5 h-5 text-blue-500" />
          EC2 Instances ({resources.ec2.length})
        </h3>
        {resources.ec2.length > 0 ? (
          <div className="space-y-3">
            {resources.ec2.map((instance) => (
              <div key={instance.id} className="flex items-center justify-between p-4 bg-gray-900/30 rounded-lg">
                <div className="flex items-center gap-4">
                  <Cpu className="w-5 h-5 text-blue-400" />
                  <div>
                    <p className="text-white font-medium">{instance.name}</p>
                    <p className="text-sm text-gray-400">{instance.id} • {instance.type}</p>
                  </div>
                </div>
                <div className="flex items-center gap-4">
                  <span className="text-sm text-gray-400">{instance.region}</span>
                  <span className={`px-2 py-1 text-xs rounded-full ${
                    instance.status === 'running' ? 'bg-green-900/50 text-green-400' :
                    instance.status === 'stopped' ? 'bg-gray-900/50 text-gray-400' :
                    'bg-yellow-900/50 text-yellow-400'
                  }`}>
                    {instance.status}
                  </span>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <p className="text-gray-400">No EC2 instances found</p>
        )}
      </div>

      {/* S3 Buckets */}
      <div className="bg-gray-800/50 backdrop-blur-sm rounded-xl p-6 border border-gray-700/50">
        <h3 className="text-lg font-semibold text-white mb-4 flex items-center gap-2">
          <HardDrive className="w-5 h-5 text-green-500" />
          S3 Buckets ({resources.s3.length})
        </h3>
        {resources.s3.length > 0 ? (
          <div className="grid grid-cols-2 gap-4">
            {resources.s3.map((bucket) => (
              <div key={bucket.name} className="p-4 bg-gray-900/30 rounded-lg">
                <div className="flex items-start justify-between mb-2">
                  <p className="text-white font-medium">{bucket.name}</p>
                  <Globe className="w-4 h-4 text-green-400" />
                </div>
                <p className="text-sm text-gray-400">
                  Created: {new Date(bucket.createdAt).toLocaleDateString()}
                </p>
              </div>
            ))}
          </div>
        ) : (
          <p className="text-gray-400">No S3 buckets found</p>
        )}
      </div>
    </div>
  );
}