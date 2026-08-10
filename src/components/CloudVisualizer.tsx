import React, { useState } from 'react';
import { Server, ShieldCheck, Database, GitBranch, Globe, Cpu, Activity, RefreshCw, CheckCircle, Terminal } from 'lucide-react';

interface CloudNode {
  id: string;
  name: string;
  type: string;
  status: 'healthy' | 'active' | 'standby';
  ipOrEndpoint: string;
  latency: string;
  load: string;
  role: string;
  details: string[];
}

export const CloudVisualizer: React.FC = () => {
  const [selectedNodeId, setSelectedNodeId] = useState<string>('ec2-primary');
  const [activeTraffic, setActiveTraffic] = useState<boolean>(true);

  const nodes: CloudNode[] = [
    {
      id: 'ingress-nginx',
      name: 'Nginx Proxy Node',
      type: 'Reverse Proxy / Edge',
      status: 'healthy',
      ipOrEndpoint: '192.0.2.10 (SSL/443)',
      latency: '1.2ms',
      load: '14%',
      role: 'Ingress routing & SSL termination',
      details: [
        'TLS 1.3 Encryption Enabled',
        'HTTP/2 Multiplexing Active',
        'Gzip Static File Compression',
        'Security Headers & Rate Limiting'
      ]
    },
    {
      id: 'ec2-primary',
      name: 'AWS EC2 Instance',
      type: 'Compute Node (Ubuntu)',
      status: 'active',
      ipOrEndpoint: 'ec2-54-210-0-1.compute',
      latency: '4.8ms',
      load: '22%',
      role: 'Core Application Runtime',
      details: [
        'OS: Ubuntu 24.04 LTS x86_64',
        'vCPU: 2 vCPUs | RAM: 4 GiB',
        'Node.js Runtime & Express Server',
        'Systemd Automated Process Manager'
      ]
    },
    {
      id: 's3-bucket',
      name: 'AWS S3 Asset Host',
      type: 'Object Storage',
      status: 'healthy',
      ipOrEndpoint: 's3.us-east-1.amazonaws.com',
      latency: '12ms',
      load: '3%',
      role: 'Static Media & Bundle Distribution',
      details: [
        'Immutable Asset Bucket Policy',
        'CDN Cache Control Headers',
        'Automated S3 Cross-Region Backup',
        'Gzip & Brotli Web Bundle Delivery'
      ]
    },
    {
      id: 'github-cicd',
      name: 'GitHub Actions Runner',
      type: 'CI/CD Pipeline Engine',
      status: 'standby',
      ipOrEndpoint: 'github.com/decodelabs/app',
      latency: 'N/A',
      load: '0%',
      role: 'Continuous Integration Build Target',
      details: [
        'Automated Linting & TypeScript Check',
        'Production Bundle Compilation',
        'Automated S3 Deployment Sync',
        'SSH Deployment Key Authentication'
      ]
    }
  ];

  const currentNode = nodes.find(n => n.id === selectedNodeId) || nodes[1];

  return (
    <div className="w-full card-panel rounded-2xl overflow-hidden border border-slate-800/90 shadow-2xl shadow-blue-950/20 bg-[#0d1424]">
      {/* Top Console Bar */}
      <div className="flex items-center justify-between px-4 py-3 bg-[#0a0e17] border-b border-slate-800 text-xs font-mono">
        <div className="flex items-center gap-2 text-slate-300">
          <div className="flex items-center gap-1.5 mr-2">
            <span className="w-2.5 h-2.5 rounded-full bg-rose-500/80"></span>
            <span className="w-2.5 h-2.5 rounded-full bg-amber-500/80"></span>
            <span className="w-2.5 h-2.5 rounded-full bg-emerald-500/80"></span>
          </div>
          <Terminal className="w-3.5 h-3.5 text-blue-400" />
          <span className="text-slate-400">decodelabs-cloud-topology.v1</span>
        </div>

        <div className="flex items-center gap-3">
          <button
            onClick={() => setActiveTraffic(!activeTraffic)}
            className={`px-2.5 py-1 rounded text-[11px] flex items-center gap-1.5 transition-colors ${
              activeTraffic
                ? 'bg-emerald-500/10 text-emerald-400 border border-emerald-500/30'
                : 'bg-slate-800 text-slate-400 border border-slate-700'
            }`}
            title="Toggle simulated network pulse"
          >
            <Activity className={`w-3 h-3 ${activeTraffic ? 'animate-pulse' : ''}`} />
            {activeTraffic ? 'Live Traffic On' : 'Traffic Idle'}
          </button>
          <span className="hidden sm:inline-block text-slate-400 text-[11px]">Region: us-east-1</span>
        </div>
      </div>

      {/* Main Diagram Canvas */}
      <div className="p-6 grid grid-cols-1 lg:grid-cols-12 gap-6 bg-gradient-to-b from-[#0e1628] to-[#080d18]">
        {/* Visual Node Network */}
        <div className="lg:col-span-7 flex flex-col justify-center space-y-4 relative py-2">
          {/* Connecting Pulse Lines Representation */}
          <div className="absolute inset-0 pointer-events-none flex items-center justify-center opacity-20">
            <div className="w-full h-px bg-gradient-to-r from-blue-500 via-cyan-400 to-emerald-500"></div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5 relative z-10">
            {nodes.map((node) => {
              const isSelected = node.id === selectedNodeId;
              let Icon = Server;
              if (node.id === 'ingress-nginx') Icon = Globe;
              if (node.id === 's3-bucket') Icon = Database;
              if (node.id === 'github-cicd') Icon = GitBranch;

              return (
                <div
                  key={node.id}
                  onClick={() => setSelectedNodeId(node.id)}
                  className={`p-4 rounded-xl cursor-pointer transition-all duration-200 border ${
                    isSelected
                      ? 'bg-blue-950/40 border-blue-500/80 shadow-lg shadow-blue-950/50 scale-[1.02]'
                      : 'bg-[#111a2e]/80 border-slate-800 hover:border-slate-700 hover:bg-[#152038]'
                  }`}
                >
                  <div className="flex items-start justify-between">
                    <div className="flex items-center gap-3">
                      <div className={`p-2 rounded-lg ${isSelected ? 'bg-blue-600 text-white' : 'bg-slate-800 text-blue-400'}`}>
                        <Icon className="w-4 h-4" />
                      </div>
                      <div>
                        <h4 className="text-xs font-semibold text-slate-100">{node.name}</h4>
                        <p className="text-[11px] text-slate-400">{node.type}</p>
                      </div>
                    </div>
                    <span className="flex h-2 w-2 relative">
                      <span className={`animate-ping absolute inline-flex h-full w-full rounded-full opacity-75 ${
                        node.status === 'active' ? 'bg-blue-400' : 'bg-emerald-400'
                      }`}></span>
                      <span className={`relative inline-flex rounded-full h-2 w-2 ${
                        node.status === 'active' ? 'bg-blue-500' : 'bg-emerald-500'
                      }`}></span>
                    </span>
                  </div>

                  <div className="mt-3 flex items-center justify-between text-[11px] font-mono pt-2 border-t border-slate-800/80 text-slate-400">
                    <span>{node.latency}</span>
                    <span className="text-slate-300">{node.load} Load</span>
                  </div>
                </div>
              );
            })}
          </div>

          <div className="p-3 rounded-lg bg-slate-900/60 border border-slate-800 text-[11px] text-slate-400 font-mono flex items-center justify-between">
            <span className="flex items-center gap-2">
              <ShieldCheck className="w-3.5 h-3.5 text-emerald-400" />
              Nginx Edge Ingress Filtering
            </span>
            <span className="text-emerald-400">HTTP/2 ACTIVE</span>
          </div>
        </div>

        {/* Selected Node Details Panel */}
        <div className="lg:col-span-5 bg-[#0a0f1c] p-4 rounded-xl border border-slate-800 flex flex-col justify-between font-mono text-xs">
          <div>
            <div className="flex items-center justify-between pb-3 border-b border-slate-800">
              <div className="flex items-center gap-2">
                <Cpu className="w-4 h-4 text-cyan-400" />
                <span className="font-semibold text-slate-200">{currentNode.name}</span>
              </div>
              <span className="px-2 py-0.5 rounded bg-blue-500/20 text-blue-300 text-[10px] uppercase tracking-wider font-semibold">
                {currentNode.status}
              </span>
            </div>

            <div className="mt-3 space-y-2 text-[11px] text-slate-300">
              <div className="flex justify-between py-1 border-b border-slate-800/50">
                <span className="text-slate-400">Endpoint</span>
                <span className="text-blue-300 truncate max-w-[180px]">{currentNode.ipOrEndpoint}</span>
              </div>
              <div className="flex justify-between py-1 border-b border-slate-800/50">
                <span className="text-slate-400">Role</span>
                <span className="text-slate-200 text-right">{currentNode.role}</span>
              </div>
              <div className="flex justify-between py-1 border-b border-slate-800/50">
                <span className="text-slate-400">Target Latency</span>
                <span className="text-emerald-400">{currentNode.latency}</span>
              </div>
            </div>

            <div className="mt-4">
              <span className="text-[10px] text-slate-400 uppercase tracking-wider font-semibold block mb-2">
                Node Specification Details
              </span>
              <ul className="space-y-1.5 text-[11px] text-slate-300">
                {currentNode.details.map((item, idx) => (
                  <li key={idx} className="flex items-center gap-2">
                    <CheckCircle className="w-3 h-3 text-cyan-400 shrink-0" />
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>

          <div className="mt-4 pt-3 border-t border-slate-800 flex items-center justify-between text-[10px] text-slate-400">
            <span>Status: Verified</span>
            <span className="text-cyan-400 flex items-center gap-1">
              <RefreshCw className="w-3 h-3 animate-spin" />
              Syncing State
            </span>
          </div>
        </div>
      </div>
    </div>
  );
};
