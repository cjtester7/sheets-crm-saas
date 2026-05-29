/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from 'react';
import { VersionedFile } from '../types';
import { FileCode, Calendar, User, GitCommit, Copy, Check, Info, FilePlus, RefreshCw } from 'lucide-react';

interface VersionTrackerProps {
  files: VersionedFile[];
  onAddFile: (file: VersionedFile) => void;
  onDeleteFile: (id: string) => void;
}

export default function VersionTracker({ files, onAddFile, onDeleteFile }: VersionTrackerProps) {
  const [copiedId, setCopiedId] = useState<string | null>(null);
  const [newFileOpen, setNewFileOpen] = useState(false);

  // States for new file registry mapping
  const [name, setName] = useState('');
  const [type, setType] = useState<'html' | 'css' | 'js' | 'json' | 'md'>('html');
  const [version, setVersion] = useState('1.0.0');
  const [description, setDescription] = useState('');
  const [author, setAuthor] = useState('Senior Portfolio Architect');
  const [dependencies, setDependencies] = useState('None');

  // Generator State
  const [genName, setGenName] = useState('chatbot-v1-2.js');
  const [genType, setGenType] = useState<'html' | 'js' | 'css' | 'json' | 'md'>('js');
  const [genVer, setGenVer] = useState('1.2.0');
  const [genDesc, setGenDesc] = useState('Integrates AI chatbot pipeline with client lead storage handlers.');
  const [genAuth, setGenAuth] = useState('Senior Technical Architect');
  const [genDeps, setGenDeps] = useState('Google Sheets API, fetch SDK');
  const [genCopied, setGenCopied] = useState(false);

  const handleCopyCode = (headerStr: string, id: string) => {
    navigator.clipboard.writeText(headerStr);
    setCopiedId(id);
    setTimeout(() => setCopiedId(null), 2000);
  };

  const generateHeaderBlock = (
    fileName: string,
    fileType: string,
    ver: string,
    desc: string,
    auth: string,
    deps: string,
    modDate: string = new Date().toISOString().split('T')[0]
  ) => {
    const rawLines = [
      `File: ${fileName}`,
      `Version: ${ver}`,
      `Date Modified: ${modDate}`,
      `Description: ${desc}`,
      `Author: ${auth}`,
      `Dependencies: ${deps}`
    ];

    if (fileType === 'html') {
      return `<!--\n${rawLines.map(l => `  * ${l}`).join('\n')}\n-->`;
    }
    if (fileType === 'json') {
      return `{\n  "_metadata": {\n${rawLines.map(l => `    "${l.split(': ')[0].toLowerCase().replace(' ', '_')}": "${l.split(': ')[1]}"`).join(',\n')}\n  }\n}`;
    }
    return `/**\n${rawLines.map(l => ` * ${l}`).join('\n')}\n */`;
  };

  const handleCreateFile = (e: React.FormEvent) => {
    e.preventDefault();
    if (!name.trim()) return;

    onAddFile({
      id: 'F' + (files.length + 1),
      name,
      type,
      version,
      lastModified: new Date().toISOString().split('T')[0],
      description,
      author,
      dependencies
    });

    setName('');
    setDescription('');
    setVersion('1.0.0');
    setNewFileOpen(false);
  };

  const currentGenBlock = generateHeaderBlock(genName, genType, genVer, genDesc, genAuth, genDeps);

  return (
    <div className="space-y-6">
      {/* Introduction Guidance */}
      <div className="rounded-xl border border-slate-200 bg-blue-50/20 p-5">
        <div className="flex gap-3">
          <Info className="h-5 w-5 text-blue-600 shrink-0 mt-0.5" />
          <div>
            <h3 className="text-xs font-bold text-slate-900 uppercase tracking-wider">Showcase Standard: Technical Code Version Catalog</h3>
            <p className="mt-1 text-xs text-slate-600 leading-relaxed">
              When recruiters inspect candidate code repositories, files like <span className="font-mono bg-blue-100/50 px-1 py-0.5 rounded text-blue-900">index-v1.html</span> and <span className="font-mono bg-blue-100/50 px-1 py-0.5 text-blue-900 rounded" >submit-v1.js</span> stand out. It proves you understand live-release versioning and rollback strategies. Every file in your GitHub showcase must contain a strict header tracking modifications. Use our generator below to compile custom code headers!
            </p>
          </div>
        </div>
      </div>

      {/* Main Grid: Code Registry & Header Generator */}
      <div className="grid grid-cols-1 gap-6 lg:grid-cols-12">
        
        {/* Left Side: Code Version Header Generator */}
        <div className="rounded-xl border border-slate-200 bg-white p-6 shadow-sm lg:col-span-5 space-y-4">
          <div className="flex items-center justify-between">
            <h2 className="text-xs font-bold text-slate-900 uppercase tracking-widest flex items-center gap-1.5">
              <RefreshCw className="h-4 w-4 text-blue-500" />
              Interactive Header Generator
            </h2>
            <button
              onClick={() => {
                navigator.clipboard.writeText(currentGenBlock);
                setGenCopied(true);
                setTimeout(() => setGenCopied(false), 2000);
              }}
              className="flex items-center gap-1 rounded bg-slate-900 px-3 py-1 text-[10px] font-bold text-white uppercase tracking-wider transition-colors hover:bg-slate-800"
              style={{ cursor: 'pointer' }}
            >
              {genCopied ? <Check className="h-3 w-3" /> : <Copy className="h-3 w-3" />}
              {genCopied ? 'Copied' : 'Copy Header'}
            </button>
          </div>

          <div className="space-y-3">
            <div>
              <label className="block text-[10px] font-bold text-slate-500 uppercase tracking-wider">Target Versioned Filename</label>
              <input
                type="text"
                value={genName}
                onChange={e => setGenName(e.target.value)}
                className="mt-1 w-full rounded border border-slate-200 bg-white px-2.5 py-1.5 text-xs text-slate-800 focus:outline-none focus:ring-1 focus:ring-blue-500"
              />
            </div>

            <div className="grid grid-cols-2 gap-3">
              <div>
                <label className="block text-[10px] font-bold text-slate-500 uppercase tracking-wider">Format Syntax</label>
                <select
                  value={genType}
                  onChange={e => setGenType(e.target.value as any)}
                  className="mt-1 w-full rounded border border-slate-200 bg-white px-2.5 py-1.5 text-xs text-slate-805 focus:outline-none focus:ring-1 focus:ring-blue-500"
                  style={{ cursor: 'pointer' }}
                >
                  <option value="js">JavaScript / CSS (/** */)</option>
                  <option value="html">HTML (&lt;!-- --&gt;)</option>
                  <option value="json">JSON Metadata Block</option>
                </select>
              </div>

              <div>
                <label className="block text-[10px] font-bold text-slate-500 uppercase tracking-wider">SemVer Release</label>
                <input
                  type="text"
                  value={genVer}
                  onChange={e => setGenVer(e.target.value)}
                  className="mt-1 w-full rounded border border-slate-200 bg-white px-2.5 py-1.5 text-xs text-slate-800 focus:outline-none focus:ring-1 focus:ring-blue-500"
                />
              </div>
            </div>

            <div>
              <label className="block text-[10px] font-bold text-slate-500 uppercase tracking-wider">Changes Description</label>
              <textarea
                value={genDesc}
                onChange={e => setGenDesc(e.target.value)}
                rows={2}
                className="mt-1 w-full rounded border border-slate-200 bg-white px-2.5 py-1.5 text-xs text-slate-800 focus:outline-none focus:ring-1 focus:ring-blue-500"
              />
            </div>

            <div className="grid grid-cols-2 gap-3">
              <div>
                <label className="block text-[10px] font-bold text-slate-500 uppercase tracking-wider">Developer / Author</label>
                <input
                  type="text"
                  value={genAuth}
                  onChange={e => setGenAuth(e.target.value)}
                  className="mt-1 w-full rounded border border-slate-200 bg-white px-2.5 py-1.5 text-xs text-slate-800 focus:outline-none focus:ring-1 focus:ring-blue-500"
                />
              </div>

              <div>
                <label className="block text-[10px] font-bold text-slate-500 uppercase tracking-wider">Upstream Deps</label>
                <input
                  type="text"
                  value={genDeps}
                  onChange={e => setGenDeps(e.target.value)}
                  className="mt-1 w-full rounded border border-slate-200 bg-white px-2.5 py-1.5 text-xs text-slate-800 focus:outline-none focus:ring-1 focus:ring-blue-500"
                />
              </div>
            </div>
          </div>

          <div className="mt-4">
            <label className="block text-[10px] font-bold text-slate-500 uppercase tracking-wider mb-1">Generated Output block</label>
            <pre className="rounded bg-slate-900 border border-slate-850 p-4 text-[10px] font-mono leading-relaxed text-emerald-400 overflow-x-auto select-all max-h-48">
              {currentGenBlock}
            </pre>
          </div>
        </div>

        {/* Right Side: Showcase Code Registry Catalog */}
        <div className="rounded-xl border border-slate-200 bg-white p-6 shadow-sm lg:col-span-7 space-y-4">
          <div className="flex items-center justify-between border-b border-slate-100 pb-3">
            <div>
              <h2 className="text-xs font-bold text-slate-950 uppercase tracking-widest flex items-center gap-1.5">
                <FileCode className="h-4 w-4 text-blue-500" />
                Showcase File Registry (Standard)
              </h2>
              <p className="text-xs text-slate-400 mt-1">Files deployed on GitHub and Netlify CDN</p>
            </div>
            
            <button
              onClick={() => setNewFileOpen(!newFileOpen)}
              className="flex items-center gap-1 rounded bg-blue-600 px-3 py-1.5 text-xs font-bold text-white uppercase tracking-wider transition-colors hover:bg-blue-700 shadow-sm shadow-blue-500/10"
              style={{ cursor: 'pointer' }}
            >
              <FilePlus className="h-4 w-4" />
              Register File
            </button>
          </div>

          {newFileOpen && (
            <form onSubmit={handleCreateFile} className="rounded-lg bg-slate-50 p-4 border border-slate-200 space-y-3">
              <h4 className="text-xs font-bold text-slate-800 uppercase tracking-wider">Register File with Header</h4>
              <div className="grid grid-cols-2 gap-3">
                <input
                  type="text"
                  required
                  placeholder="e.g. crm-config-v1.json"
                  value={name}
                  onChange={e => setName(e.target.value)}
                  className="rounded border border-slate-205 bg-white px-2.5 py-1 text-xs"
                />
                <select
                  value={type}
                  onChange={e => setType(e.target.value as any)}
                  className="rounded border border-slate-205 bg-white px-2.5 py-1 text-xs"
                >
                  <option value="html">HTML</option>
                  <option value="css">CSS</option>
                  <option value="js">JavaScript</option>
                  <option value="json">JSON mapping</option>
                  <option value="md">Markdown</option>
                </select>
              </div>

              <div className="grid grid-cols-2 gap-3">
                <input
                  type="text"
                  placeholder="Version e.g. 1.0.0"
                  value={version}
                  onChange={e => setVersion(e.target.value)}
                  className="rounded border border-slate-205 bg-white px-2.5 py-1 text-xs"
                />
                <input
                  type="text"
                  placeholder="Dependencies e.g. jQuery"
                  value={dependencies}
                  onChange={e => setDependencies(e.target.value)}
                  className="rounded border border-slate-205 bg-white px-2.5 py-1 text-xs"
                />
              </div>

              <input
                type="text"
                placeholder="Brief description of code changes"
                value={description}
                onChange={e => setDescription(e.target.value)}
                className="w-full rounded border border-slate-205 bg-white px-2.5 py-1 text-xs"
              />

              <div className="flex justify-end gap-2 text-xs font-bold uppercase tracking-wider">
                <button
                  type="button"
                  onClick={() => setNewFileOpen(false)}
                  className="rounded bg-slate-200 px-3 py-1 text-slate-705"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="rounded bg-slate-900 px-3 py-1 text-white"
                >
                  Add File
                </button>
              </div>
            </form>
          )}

          <div className="space-y-3">
            {files.map((file) => {
              const fileHeader = generateHeaderBlock(file.name, file.type, file.version, file.description, file.author, file.dependencies, file.lastModified);
              const isCopied = copiedId === file.id;

              return (
                <div key={file.id} className="rounded-xl border border-slate-150 p-4 hover:bg-slate-50/50 bg-slate-50/30">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                       <span className="font-mono text-xs font-bold text-slate-700 bg-white border border-slate-200 px-1.5 py-0.5 rounded">F/{file.name}</span>
                      <span className="rounded bg-blue-50 px-1.5 py-0.5 text-[10px] font-bold text-blue-700 border border-blue-100">
                        v{file.version}
                      </span>
                    </div>

                    <button
                      onClick={() => handleCopyCode(fileHeader, file.id)}
                      className="flex items-center gap-1 text-[10px] font-bold text-slate-500 hover:text-slate-900 uppercase tracking-wider"
                      title="Copy header content block"
                    >
                      {isCopied ? <Check className="h-3.5 w-3.5 text-emerald-600" /> : <Copy className="h-3.5 w-3.5 text-slate-400" />}
                      {isCopied ? 'Copied' : 'Copy Header'}
                    </button>
                  </div>

                  <p className="mt-2 text-xs text-slate-500 leading-relaxed font-sans">{file.description}</p>

                  <div className="mt-3 flex flex-wrap gap-4 border-t border-slate-100 pt-3 text-[10px] font-bold font-mono tracking-wide text-slate-400 uppercase">
                    <span className="flex items-center gap-1">
                      <Calendar className="h-3.5 w-3.5 text-slate-500" />
                      MODIFIED: {file.lastModified}
                    </span>
                    <span className="flex items-center gap-1">
                      <User className="h-3.5 w-3.5 text-slate-500" />
                      AUTHOR: {file.author}
                    </span>
                    <span className="flex items-center gap-1">
                      <GitCommit className="h-3.5 w-3.5 text-slate-500" />
                      DEPS: {file.dependencies}
                    </span>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
}
