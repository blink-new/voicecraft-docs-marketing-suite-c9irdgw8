export const downloadTextAsFile = (content: string, filename: string, fileType: string = 'text/plain') => {
  const blob = new Blob([content], { type: fileType })
  const url = URL.createObjectURL(blob)
  const a = document.createElement('a')
  a.href = url
  a.download = filename
  document.body.appendChild(a)
  a.click()
  document.body.removeChild(a)
  URL.revokeObjectURL(url)
}

export const downloadPDF = (content: string, filename: string) => {
  // For a real implementation, you would use a PDF library like jsPDF
  // For now, we'll download as a formatted text file that can be converted to PDF
  const formattedContent = `
VoiceCraft Documentation
========================

${content}

========================
Generated on: ${new Date().toLocaleDateString()}
Format: PDF-ready text document
Instructions: This document is formatted for easy PDF conversion.
You can copy this content into any word processor and save as PDF.
`
  downloadTextAsFile(formattedContent, filename, 'text/plain')
}

export const downloadAllResources = () => {
  // Create a comprehensive resource package
  const allResourcesContent = `
VoiceCraft Complete Resource Package
===================================

This package contains all VoiceCraft documentation and guides:

1. User Manual (Complete)
2. Step-by-Step Setup Guide
3. Effective Practice Guide
4. Progress Tracking Guide
5. FAQ Collection
6. Video Tutorial Descriptions
7. Social Media Content Templates

Download each resource individually from the VoiceCraft Documentation Suite,
or contact support@voicecraft.com for the complete multimedia package.

Generated on: ${new Date().toLocaleDateString()}
Version: 2.1
`
  downloadTextAsFile(allResourcesContent, 'VoiceCraft-Complete-Resources.txt', 'text/plain')
}