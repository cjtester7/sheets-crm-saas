/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

export interface Task {
  id: string;
  title: string;
  description: string;
  category: string;
  status: 'todo' | 'in_progress' | 'done';
  phase: 1 | 2;
}

export interface VersionedFile {
  id: string;
  name: string;
  type: 'html' | 'css' | 'js' | 'json' | 'md';
  version: string;
  lastModified: string;
  description: string;
  author: string;
  dependencies: string;
}

export interface BugLog {
  id: string;
  fileName: string;
  errorMsg: string;
  rootCause: string;
  resolution: string;
  status: 'unresolved' | 'resolved';
  severity: 'low' | 'medium' | 'high';
  createdAt: string;
}

export interface CommitBuilder {
  type: string;
  scope: string;
  subject: string;
  body: string;
  version: string;
  taskId: string;
}
