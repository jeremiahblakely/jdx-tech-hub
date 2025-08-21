// app/projects/[id]/aws/page.js
'use client';

import { useState } from 'react';
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
  Zap
} from 'lucide-react';

export default function AWSResourcesPage() {
  const [resources] = useState({
    ec2: [
      { id: 'i-1234567890', name: 'web-server-01', type: 't3.medium', status: 'running', region: 'us-west-2' },
      { id: 'i-0987654321', name: 'api-server-01', type: 't3.small', status: 'running', region: 'us-west-2' }
    ],
    rds: [
      { id: 'db-prod-01', engine: 'PostgreSQL 14.7', class: 'db.t3.micro', storage: '20 GB', status: 'available' }
    ],
    s3: [
      { name: 'jdx-assets', size: '1.2 GB', objects: 342, region: 'us-west-2' },
      { name: 'jdx-backups', size: '5.8 GB', objects: 89, region: 'us-west-2' }
    ]
  });

  const [monthlyCost] = useState({
    current: 127.43,
    projected: 145.00,
    trend: 'up'
  });

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex justify-between items-center">
        <div>
          <h2 className="text-3xl font-bold text-white mb-2">AWS Resources</h2>
          <p className="text-gray-400">Monitor and manage your cloud infrastructure</p>
        </div>
        <button className="flex items-center gap-2 px-4 py-2 bg-orange-600 hover:bg-orange-700 text-white rounded-lg transition-colors">
          <Cloud className="w-4 h-4" />
          Open AWS Console
        </button>
      </div>

      {/* Cost Overview */}
      <div className="bg-gray-800/50 backdrop-blur-sm rounded-xl p-6 border border-gray-700/50">
        <h3 className="text-lg font-semibold text-white mb-4 flex items-center gap-2">
          <DollarSign className="w-5 h-5 text-green-500" />
          Monthly Cost Overview
        </h3>
        <div className="grid grid-cols-3 gap-6">
          <div>
            <p className="text-sm text-gray-400 mb-1">Current Month</p>
            <p className="text-2xl font-bold text-white">${monthlyCost.current}</p>
          </div>
          <div>
            <p className="text-sm text-gray-400 mb-1">Projected</p>
            <p className="text-2xl font-bold text-yellow-400">${monthlyCost.projected}</p>
          </div>
          <div>
            <p className="text-sm text-gray-400 mb-1">Trend</p>
            <div className="flex items-center gap-2">
              <TrendingUp className="w-5 h-5 text-orange-400" />
              <span className="text-orange-400">+14%</span>
            </div>
          </div>
        </div>
      </div>

      {/* EC2 Instances */}
      <div className="bg-gray-800/50 backdrop-blur-sm rounded-xl p-6 border border-gray-700/50">
        <h3 className="text-lg font-semibold text-white mb-4 flex items-center gap-2">
          <Server className="w-5 h-5 text-blue-500" />
          EC2 Instances
        </h3>
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
                <span className="px-2 py-1 bg-green-900/50 text-green-400 text-xs rounded-full">
                  {instance.status}
                </span>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* RDS Databases */}
      <div className="bg-gray-800/50 backdrop-blur-sm rounded-xl p-6 border border-gray-700/50">
        <h3 className="text-lg font-semibold text-white mb-4 flex items-center gap-2">
          <Database className="w-5 h-5 text-purple-500" />
          RDS Databases
        </h3>
        <div className="space-y-3">
          {resources.rds.map((db) => (
            <div key={db.id} className="flex items-center justify-between p-4 bg-gray-900/30 rounded-lg">
              <div className="flex items-center gap-4">
                <Database className="w-5 h-5 text-purple-400" />
                <div>
                  <p className="text-white font-medium">{db.id}</p>
                  <p className="text-sm text-gray-400">{db.engine} • {db.class}</p>
                </div>
              </div>
              <div className="flex items-center gap-4">
                <span className="text-sm text-gray-400">{db.storage}</span>
                <span className="px-2 py-1 bg-green-900/50 text-green-400 text-xs rounded-full">
                  {db.status}
                </span>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* S3 Buckets */}
      <div className="bg-gray-800/50 backdrop-blur-sm rounded-xl p-6 border border-gray-700/50">
        <h3 className="text-lg font-semibold text-white mb-4 flex items-center gap-2">
          <HardDrive className="w-5 h-5 text-green-500" />
          S3 Buckets
        </h3>
        <div className="grid grid-cols-2 gap-4">
          {resources.s3.map((bucket) => (
            <div key={bucket.name} className="p-4 bg-gray-900/30 rounded-lg">
              <div className="flex items-start justify-between mb-2">
                <p className="text-white font-medium">{bucket.name}</p>
                <Globe className="w-4 h-4 text-green-400" />
              </div>
              <div className="space-y-1 text-sm text-gray-400">
                <p>Size: {bucket.size}</p>
                <p>Objects: {bucket.objects}</p>
                <p>Region: {bucket.region}</p>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Service Health */}
      <div className="bg-gray-800/50 backdrop-blur-sm rounded-xl p-6 border border-gray-700/50">
        <h3 className="text-lg font-semibold text-white mb-4 flex items-center gap-2">
          <Activity className="w-5 h-5 text-green-500" />
          Service Health
        </h3>
        <div className="grid grid-cols-4 gap-4">
          <div className="text-center">
            <div className="w-12 h-12 bg-green-900/30 rounded-lg flex items-center justify-center mx-auto mb-2">
              <Server className="w-6 h-6 text-green-400" />
            </div>
            <p className="text-sm text-white">EC2</p>
            <p className="text-xs text-green-400">Operational</p>
          </div>
          <div className="text-center">
            <div className="w-12 h-12 bg-green-900/30 rounded-lg flex items-center justify-center mx-auto mb-2">
              <Database className="w-6 h-6 text-green-400" />
            </div>
            <p className="text-sm text-white">RDS</p>
            <p className="text-xs text-green-400">Operational</p>
          </div>
          <div className="text-center">
            <div className="w-12 h-12 bg-green-900/30 rounded-lg flex items-center justify-center mx-auto mb-2">
              <HardDrive className="w-6 h-6 text-green-400" />
            </div>
            <p className="text-sm text-white">S3</p>
            <p className="text-xs text-green-400">Operational</p>
          </div>
          <div className="text-center">
            <div className="w-12 h-12 bg-green-900/30 rounded-lg flex items-center justify-center mx-auto mb-2">
              <Shield className="w-6 h-6 text-green-400" />
            </div>
            <p className="text-sm text-white">CloudFront</p>
            <p className="text-xs text-green-400">Operational</p>
          </div>
        </div>
      </div>

      {/* Notice */}
      <div className="bg-blue-900/20 border border-blue-700/50 rounded-lg p-4 flex items-start gap-3">
        <AlertCircle className="w-5 h-5 text-blue-400 mt-0.5" />
        <div className="text-sm text-blue-200">
          <p className="font-semibold mb-1">AWS Integration Coming Soon</p>
          <p>Full AWS SDK integration with real-time resource monitoring and cost tracking will be available in the next update.</p>
        </div>
      </div>
    </div>
  );
}