// Blueprint Type Definitions (JavaScript with JSDoc)

/**
 * @typedef {'low' | 'medium' | 'high' | 'critical'} TaskPriority
 * @typedef {'not-started' | 'in-progress' | 'completed' | 'blocked'} TaskStatus
 * @typedef {'web-app' | 'mobile-app' | 'api' | 'desktop-app' | 'library'} ProjectType
 * @typedef {'missing' | 'configured' | 'tested' | 'invalid'} CredentialStatus
 * @typedef {'not-built' | 'built' | 'tested' | 'deployed'} EndpointStatus
 * @typedef {'GET' | 'POST' | 'PUT' | 'DELETE' | 'PATCH'} HTTPMethod
 */

/**
 * @typedef {Object} ChecklistItem
 * @property {string} id
 * @property {string} label
 * @property {boolean} checked
 * @property {boolean} required
 * @property {string} [notes]
 */

/**
 * @typedef {Object} CredentialItem
 * @property {string} key
 * @property {string} name
 * @property {CredentialStatus} status
 * @property {boolean} required
 * @property {boolean} sensitive
 * @property {boolean} testable
 * @property {string} [description]
 * @property {string} [example]
 */

/**
 * @typedef {Object} EndpointItem
 * @property {HTTPMethod} method
 * @property {string} path
 * @property {EndpointStatus} status
 * @property {boolean} hasAuth
 * @property {boolean} hasValidation
 * @property {boolean} hasErrorHandling
 * @property {string} [description]
 * @property {Object} [requestSchema]
 * @property {Object} [responseSchema]
 */

/**
 * @typedef {Object} Task
 * @property {string} id
 * @property {string} title
 * @property {TaskPriority} priority
 * @property {TaskStatus} status
 * @property {number} estimatedMinutes
 * @property {number} [actualMinutes]
 * @property {string} [description]
 * @property {ChecklistItem[]} [checklist]
 * @property {CredentialItem[]} [credentials]
 * @property {EndpointItem[]} [endpoints]
 * @property {string[]} [dependencies]
 * @property {string} [notes]
 * @property {string} [assignee]
 * @property {string} [dueDate]
 * @property {string} [completedAt]
 */

/**
 * @typedef {Object} Phase
 * @property {string} [id]
 * @property {string} name
 * @property {string} description
 * @property {number} order
 * @property {number} estimatedHours
 * @property {number} [actualHours]
 * @property {'not-started' | 'in-progress' | 'completed'} [status]
 * @property {string[]} [dependencies]
 * @property {Task[]} tasks
 * @property {string} [startDate]
 * @property {string} [endDate]
 * @property {string} [completedAt]
 */

/**
 * @typedef {Object} BlueprintTemplate
 * @property {string} id
 * @property {string} name
 * @property {string} description
 * @property {ProjectType} type
 * @property {string[]} tags
 * @property {number} popularity
 * @property {number} estimatedHours
 * @property {string[]} techStack
 * @property {string[]} commonCredentials
 * @property {Phase[]} phases
 * @property {string} [version]
 * @property {string} [createdBy]
 * @property {string} [createdAt]
 * @property {string} [updatedAt]
 */

/**
 * @typedef {Object} ProjectBlueprint
 * @property {string} id
 * @property {string} projectId
 * @property {string} templateId
 * @property {string} name
 * @property {string} description
 * @property {ProjectType} type
 * @property {'planning' | 'active' | 'completed' | 'archived'} status
 * @property {Phase[]} phases
 * @property {Object} progress
 * @property {number} progress.totalTasks
 * @property {number} progress.completedTasks
 * @property {number} progress.percentage
 * @property {number} progress.estimatedHours
 * @property {number} progress.actualHours
 * @property {Object} completeness
 * @property {boolean} completeness.hasAllCredentials
 * @property {boolean} completeness.hasAllEndpoints
 * @property {boolean} completeness.hasAllChecklist
 * @property {boolean} completeness.productionReady
 * @property {string} completeness.lastScanned
 * @property {string} createdAt
 * @property {string} updatedAt
 * @property {string} [dueDate]
 * @property {string} [assignee]
 */

/**
 * @typedef {Object} CompletenessReport
 * @property {string} projectId
 * @property {string} blueprintId
 * @property {string} scannedAt
 * @property {number} overallScore
 * @property {Object} categories
 * @property {Object} categories.credentials
 * @property {Object} categories.endpoints
 * @property {Object} categories.checklist
 * @property {Object} categories.deployment
 * @property {string[]} recommendations
 * @property {string[]} blockers
 * @property {string[]} warnings
 */

// Export empty object to make this a proper module
export {};