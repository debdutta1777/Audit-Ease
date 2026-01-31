import { useState } from 'react';
import { Shield, Lock, Database, FileCheck, ChevronRight, X, Check } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { cn } from '@/lib/utils';

export interface PresetStandard {
  id: string;
  name: string;
  shortName: string;
  description: string;
  icon: React.ReactNode;
  category: string;
  keyRequirements: string[];
  extractedText: string;
}

const PRESET_STANDARDS: PresetStandard[] = [
  {
    id: 'gdpr',
    name: 'General Data Protection Regulation',
    shortName: 'GDPR',
    description: 'EU regulation on data protection and privacy for individuals within the European Union and European Economic Area.',
    icon: <Shield className="h-6 w-6" />,
    category: 'Data Privacy',
    keyRequirements: [
      'Lawful basis for processing',
      'Data subject rights',
      'Data breach notification',
      'Privacy by design',
      'Data Protection Officer',
      'Cross-border data transfers'
    ],
    extractedText: `GENERAL DATA PROTECTION REGULATION (GDPR) - KEY COMPLIANCE REQUIREMENTS

ARTICLE 5 - PRINCIPLES RELATING TO PROCESSING OF PERSONAL DATA
1. Personal data shall be:
(a) processed lawfully, fairly and in a transparent manner in relation to the data subject ('lawfulness, fairness and transparency');
(b) collected for specified, explicit and legitimate purposes and not further processed in a manner that is incompatible with those purposes ('purpose limitation');
(c) adequate, relevant and limited to what is necessary in relation to the purposes for which they are processed ('data minimisation');
(d) accurate and, where necessary, kept up to date ('accuracy');
(e) kept in a form which permits identification of data subjects for no longer than is necessary ('storage limitation');
(f) processed in a manner that ensures appropriate security of the personal data ('integrity and confidentiality').

ARTICLE 6 - LAWFULNESS OF PROCESSING
Processing shall be lawful only if and to the extent that at least one of the following applies:
(a) the data subject has given consent to the processing;
(b) processing is necessary for the performance of a contract;
(c) processing is necessary for compliance with a legal obligation;
(d) processing is necessary to protect vital interests;
(e) processing is necessary for a task carried out in the public interest;
(f) processing is necessary for legitimate interests pursued by the controller.

ARTICLE 7 - CONDITIONS FOR CONSENT
The controller shall be able to demonstrate that the data subject has consented. Consent must be freely given, specific, informed and unambiguous. Data subject has right to withdraw consent at any time.

ARTICLE 12-23 - RIGHTS OF THE DATA SUBJECT
- Right to access personal data
- Right to rectification
- Right to erasure ('right to be forgotten')
- Right to restriction of processing
- Right to data portability
- Right to object to processing
- Rights related to automated decision making and profiling

ARTICLE 25 - DATA PROTECTION BY DESIGN AND BY DEFAULT
The controller shall implement appropriate technical and organisational measures for ensuring that, by default, only personal data which are necessary for each specific purpose are processed.

ARTICLE 32 - SECURITY OF PROCESSING
Controllers and processors must implement appropriate technical and organisational measures including:
- Pseudonymisation and encryption of personal data
- Ability to ensure confidentiality, integrity, availability
- Ability to restore availability and access to personal data
- Process for regularly testing security measures

ARTICLE 33-34 - DATA BREACH NOTIFICATION
Personal data breaches must be notified to supervisory authority within 72 hours. High-risk breaches must also be communicated to affected data subjects.

ARTICLE 35 - DATA PROTECTION IMPACT ASSESSMENT
Required when processing is likely to result in high risk to rights and freedoms of natural persons.

ARTICLE 37-39 - DATA PROTECTION OFFICER
Required for public authorities, large-scale systematic monitoring, or large-scale processing of special categories of data.

ARTICLE 44-49 - TRANSFERS TO THIRD COUNTRIES
Personal data transfers outside EEA only permitted with adequate safeguards (adequacy decisions, SCCs, BCRs, etc.)`
  },
  {
    id: 'soc2',
    name: 'SOC 2 Type II',
    shortName: 'SOC 2',
    description: 'AICPA framework for managing customer data based on five trust service criteria: security, availability, processing integrity, confidentiality, and privacy.',
    icon: <Lock className="h-6 w-6" />,
    category: 'Security',
    keyRequirements: [
      'Access controls',
      'Change management',
      'Risk assessment',
      'Incident response',
      'Vendor management',
      'Encryption standards'
    ],
    extractedText: `SOC 2 TYPE II - TRUST SERVICES CRITERIA COMPLIANCE REQUIREMENTS

SECURITY (COMMON CRITERIA)
CC1 - CONTROL ENVIRONMENT
CC1.1: The entity demonstrates a commitment to integrity and ethical values.
CC1.2: The board of directors demonstrates independence and exercises oversight.
CC1.3: Management establishes structures, reporting lines, and authorities.
CC1.4: The entity demonstrates commitment to attract, develop, and retain competent individuals.
CC1.5: The entity holds individuals accountable for their internal control responsibilities.

CC2 - COMMUNICATION AND INFORMATION
CC2.1: The entity obtains or generates and uses relevant, quality information.
CC2.2: The entity internally communicates information necessary for internal controls.
CC2.3: The entity communicates with external parties regarding internal control matters.

CC3 - RISK ASSESSMENT
CC3.1: The entity specifies objectives with sufficient clarity to enable identification of risks.
CC3.2: The entity identifies risks to the achievement of objectives and analyzes risks.
CC3.3: The entity considers the potential for fraud in assessing risks.
CC3.4: The entity identifies and assesses changes that could significantly impact internal controls.

CC4 - MONITORING ACTIVITIES
CC4.1: The entity selects, develops, and performs ongoing and/or separate evaluations.
CC4.2: The entity evaluates and communicates internal control deficiencies in a timely manner.

CC5 - CONTROL ACTIVITIES
CC5.1: The entity selects and develops control activities that contribute to risk mitigation.
CC5.2: The entity selects and develops general controls over technology.
CC5.3: The entity deploys control activities through policies and procedures.

CC6 - LOGICAL AND PHYSICAL ACCESS CONTROLS
CC6.1: The entity implements logical access security software, infrastructure, and architectures.
CC6.2: Prior to issuing system credentials, the entity registers and authorizes new users.
CC6.3: The entity authorizes, modifies, or removes access to data and systems.
CC6.4: The entity restricts physical access to facilities and protected information assets.
CC6.5: The entity discontinues logical and physical protections when no longer needed.
CC6.6: The entity implements logical access security measures against threats.
CC6.7: The entity restricts the transmission of data to authorized users.
CC6.8: The entity implements controls to prevent or detect unauthorized software.

CC7 - SYSTEM OPERATIONS
CC7.1: The entity uses detection and monitoring procedures to identify security events.
CC7.2: The entity monitors system components for anomalies indicative of malicious acts.
CC7.3: The entity evaluates security events to determine if they are security incidents.
CC7.4: The entity responds to identified security incidents by executing response procedures.
CC7.5: The entity identifies, develops, and implements remediation activities.

CC8 - CHANGE MANAGEMENT
CC8.1: The entity authorizes, designs, develops, configures, tests, and implements changes.

CC9 - RISK MITIGATION
CC9.1: The entity identifies, selects, and develops risk mitigation activities.
CC9.2: The entity assesses and manages risks associated with vendors and partners.

AVAILABILITY CRITERIA
A1.1: The entity maintains, monitors, and evaluates current processing capacity.
A1.2: The entity authorizes, designs, develops, implements, and maintains system recovery.
A1.3: The entity tests recovery plan procedures supporting system recovery.

CONFIDENTIALITY CRITERIA
C1.1: The entity identifies and maintains confidential information.
C1.2: The entity disposes of confidential information.

PROCESSING INTEGRITY CRITERIA
PI1.1: The entity obtains or generates, uses, and communicates quality information.
PI1.2: The entity implements policies and procedures for system inputs.
PI1.3: The entity implements policies and procedures for system processing.
PI1.4: The entity implements policies and procedures for system outputs.
PI1.5: The entity implements policies and procedures to store inputs, items in processing, and outputs.

PRIVACY CRITERIA
P1-P8: Notice, choice, collection, use, access, disclosure, quality, and monitoring requirements.`
  },
  {
    id: 'hipaa',
    name: 'Health Insurance Portability and Accountability Act',
    shortName: 'HIPAA',
    description: 'US legislation that provides data privacy and security provisions for safeguarding medical information.',
    icon: <Database className="h-6 w-6" />,
    category: 'Healthcare',
    keyRequirements: [
      'PHI safeguards',
      'Access controls',
      'Audit controls',
      'Transmission security',
      'Business associate agreements',
      'Breach notification'
    ],
    extractedText: `HIPAA COMPLIANCE REQUIREMENTS - SECURITY AND PRIVACY RULES

ADMINISTRATIVE SAFEGUARDS (§164.308)

(a)(1) SECURITY MANAGEMENT PROCESS
- Conduct accurate and thorough risk analysis
- Implement security measures to reduce risks and vulnerabilities
- Apply appropriate sanctions against workforce members who violate policies
- Implement procedures to regularly review records of system activity

(a)(2) ASSIGNED SECURITY RESPONSIBILITY
Identify the security official responsible for developing and implementing policies and procedures.

(a)(3) WORKFORCE SECURITY
- Implement procedures for authorization and/or supervision of workforce members
- Implement procedures to determine appropriate access for workforce members
- Implement procedures for terminating access when employment ends

(a)(4) INFORMATION ACCESS MANAGEMENT
- Implement policies and procedures for authorizing access to ePHI
- Implement policies and procedures for granting access to workstations and systems
- Implement policies and procedures for documenting access modifications

(a)(5) SECURITY AWARENESS AND TRAINING
- Implement security reminders
- Implement procedures for guarding against malicious software
- Implement procedures for monitoring log-in attempts
- Implement procedures for creating, changing, and safeguarding passwords

(a)(6) SECURITY INCIDENT PROCEDURES
Implement policies and procedures to address security incidents, including identification, response, mitigation, and documentation.

(a)(7) CONTINGENCY PLAN
- Establish and implement data backup plan
- Establish and implement disaster recovery plan
- Establish and implement emergency mode operation plan
- Implement procedures for periodic testing and revision
- Assess criticality of applications and data

(a)(8) EVALUATION
Perform periodic technical and non-technical evaluation of security policies and procedures.

PHYSICAL SAFEGUARDS (§164.310)

(a)(1) FACILITY ACCESS CONTROLS
- Implement policies and procedures to limit physical access
- Implement procedures to safeguard facility and equipment from unauthorized access
- Implement procedures to control and validate access based on role
- Document repairs and modifications to physical security components

(b)(1) WORKSTATION USE
Implement policies and procedures for proper functions, manner, and physical attributes of workstations.

(c)(1) DEVICE AND MEDIA CONTROLS
- Implement policies for final disposal of ePHI and hardware
- Implement procedures for removal of ePHI before reuse of media
- Maintain record of movements of hardware and electronic media
- Create retrievable exact copy of ePHI before movement of equipment

TECHNICAL SAFEGUARDS (§164.312)

(a)(1) ACCESS CONTROL
- Assign unique user identification to each user
- Establish emergency access procedure
- Implement automatic logoff after period of inactivity
- Implement mechanism to encrypt and decrypt ePHI

(b) AUDIT CONTROLS
Implement hardware, software, and procedural mechanisms to record and examine access and activity.

(c)(1) INTEGRITY
Implement policies and procedures to protect ePHI from improper alteration or destruction.

(d) PERSON OR ENTITY AUTHENTICATION
Implement procedures to verify identity of persons or entities seeking access to ePHI.

(e)(1) TRANSMISSION SECURITY
- Implement security measures to ensure ePHI is not improperly modified during transmission
- Implement mechanism to encrypt ePHI during transmission when appropriate

PRIVACY RULE REQUIREMENTS

- Minimum Necessary Standard: Limit PHI use and disclosure to minimum necessary
- Patient Rights: Access, amendment, accounting of disclosures, restrictions
- Notice of Privacy Practices: Describe how PHI may be used and disclosed
- Business Associate Agreements: Required for all business associates handling PHI
- Authorization Requirements: Specific authorizations for uses beyond TPO
- De-identification Standards: Safe harbor or expert determination methods

BREACH NOTIFICATION RULE

- Notify affected individuals within 60 days of breach discovery
- Notify HHS for breaches affecting 500+ individuals within 60 days
- Maintain breach log and report annually for breaches under 500 individuals
- Notify media for breaches affecting 500+ individuals in a state/jurisdiction`
  },
  {
    id: 'ccpa',
    name: 'California Consumer Privacy Act',
    shortName: 'CCPA',
    description: 'California state statute intended to enhance privacy rights and consumer protection for residents of California.',
    icon: <FileCheck className="h-6 w-6" />,
    category: 'Data Privacy',
    keyRequirements: [
      'Right to know',
      'Right to delete',
      'Right to opt-out',
      'Non-discrimination',
      'Privacy policy updates',
      'Data inventory'
    ],
    extractedText: `CALIFORNIA CONSUMER PRIVACY ACT (CCPA) - COMPLIANCE REQUIREMENTS

SECTION 1798.100 - CONSUMER RIGHT TO KNOW

(a) A consumer shall have the right to request that a business disclose:
1. The categories of personal information it has collected about that consumer
2. The categories of sources from which the personal information is collected
3. The business or commercial purpose for collecting or selling personal information
4. The categories of third parties with whom the business shares personal information
5. The specific pieces of personal information it has collected about that consumer

(b) A business that collects personal information shall, at or before the point of collection, inform consumers of the categories of personal information to be collected and the purposes for which they will be used.

SECTION 1798.105 - CONSUMER RIGHT TO DELETE

(a) A consumer shall have the right to request that a business delete any personal information about the consumer which the business has collected from the consumer.

(b) A business that collects personal information shall disclose the consumer's right to request deletion.

(c) A business that receives a verifiable consumer request shall delete the consumer's personal information and direct any service providers to delete the consumer's personal information.

EXCEPTIONS TO DELETION:
- Complete the transaction for which the personal information was collected
- Detect security incidents
- Debug to identify and repair errors
- Exercise free speech or other legal rights
- Comply with legal obligations
- Use internally in a manner compatible with reasonable consumer expectations

SECTION 1798.110 - RIGHT TO KNOW WHAT PERSONAL INFORMATION IS COLLECTED

A business shall provide the following information upon receipt of a verifiable request:
1. Categories of personal information collected in the preceding 12 months
2. Categories of sources from which personal information is collected
3. Business or commercial purpose for collecting or selling personal information
4. Categories of third parties with whom personal information is shared
5. Specific pieces of personal information collected about the consumer

SECTION 1798.115 - RIGHT TO KNOW ABOUT SALE/DISCLOSURE OF PERSONAL INFORMATION

A consumer shall have the right to request disclosure of:
1. Categories of personal information collected
2. Categories of personal information sold and categories of third parties to whom sold
3. Categories of personal information disclosed for business purposes

SECTION 1798.120 - RIGHT TO OPT-OUT OF SALE OF PERSONAL INFORMATION

(a) A consumer shall have the right to direct a business that sells personal information to not sell that consumer's personal information ("right to opt-out").

(b) A business shall not sell personal information of consumers if it has actual knowledge that the consumer is less than 16 years of age.

(c) A business that sells personal information shall provide a clear and conspicuous link on its homepage titled "Do Not Sell My Personal Information" that enables a consumer to opt-out.

SECTION 1798.125 - NON-DISCRIMINATION

(a) A business shall not discriminate against a consumer because the consumer exercised any of the consumer's rights, including:
1. Denying goods or services to the consumer
2. Charging different prices or rates for goods or services
3. Providing a different level or quality of goods or services
4. Suggesting that the consumer will receive a different price or rate or different level or quality

(b) Financial incentive practices are permitted if material terms are disclosed and consumer has opted-in.

SECTION 1798.130 - BUSINESS RESPONSIBILITIES

A business shall:
1. Make available two or more designated methods for submitting requests
2. Disclose and deliver required information within 45 days of receiving a verifiable request
3. Not require consumer to create an account to make a request
4. Use personal information received only for verification purposes
5. Provide training and information to personnel handling consumer inquiries

SECTION 1798.135 - HOMEPAGE REQUIREMENTS

A business that is required to comply shall:
1. Provide a "Do Not Sell My Personal Information" link on homepage
2. Provide a description of consumer's rights
3. Provide a designated method for submitting opt-out requests
4. Respond to opt-out requests within 15 business days

SECTION 1798.140 - DEFINITIONS

"Personal Information" includes: identifiers, commercial information, biometric information, internet/electronic network activity, geolocation data, audio/visual information, professional/employment information, education information, and inferences drawn from the above.

"Sale" means selling, renting, releasing, disclosing, disseminating, making available, or transferring a consumer's personal information for monetary or other valuable consideration.`
  }
];

interface StandardsLibraryProps {
  onSelectStandard: (standard: PresetStandard) => void;
  selectedStandard?: PresetStandard | null;
  onClear?: () => void;
}

export function StandardsLibrary({ onSelectStandard, selectedStandard, onClear }: StandardsLibraryProps) {
  const [expanded, setExpanded] = useState<string | null>(null);

  if (selectedStandard) {
    return (
      <div className="glass-card rounded-xl p-6">
        <div className="flex items-start justify-between mb-4">
          <div>
            <h3 className="font-semibold text-foreground">The Standard (Regulation/Law)</h3>
          </div>
          <Button
            variant="ghost"
            size="icon"
            onClick={onClear}
            className="h-8 w-8 text-muted-foreground hover:text-destructive"
          >
            <X className="h-4 w-4" />
          </Button>
        </div>
        
        <div className="flex items-center gap-3 p-4 rounded-lg bg-success/10 border border-success/20">
          <Check className="h-5 w-5 text-success" />
          <div className="flex items-center gap-3 min-w-0">
            <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-primary/10 text-primary">
              {selectedStandard.icon}
            </div>
            <div>
              <span className="font-medium text-foreground">{selectedStandard.shortName}</span>
              <p className="text-sm text-muted-foreground">{selectedStandard.name}</p>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="glass-card rounded-xl p-6">
      <div className="mb-4">
        <h3 className="font-semibold text-foreground">The Standard (Regulation/Law)</h3>
        <p className="text-sm text-muted-foreground mt-1">
          Select a compliance framework from our library
        </p>
      </div>

      <div className="space-y-3">
        {PRESET_STANDARDS.map((standard) => (
          <div
            key={standard.id}
            className={cn(
              "border rounded-lg transition-all cursor-pointer",
              expanded === standard.id
                ? "border-primary bg-primary/5"
                : "border-border hover:border-primary/50"
            )}
          >
            <div
              className="flex items-center gap-4 p-4"
              onClick={() => setExpanded(expanded === standard.id ? null : standard.id)}
            >
              <div className="flex h-12 w-12 items-center justify-center rounded-lg bg-primary/10 text-primary shrink-0">
                {standard.icon}
              </div>
              <div className="flex-1 min-w-0">
                <div className="flex items-center gap-2">
                  <span className="font-semibold text-foreground">{standard.shortName}</span>
                  <Badge variant="outline" className="text-xs">{standard.category}</Badge>
                </div>
                <p className="text-sm text-muted-foreground truncate">{standard.name}</p>
              </div>
              <ChevronRight
                className={cn(
                  "h-5 w-5 text-muted-foreground transition-transform",
                  expanded === standard.id && "rotate-90"
                )}
              />
            </div>

            {expanded === standard.id && (
              <div className="px-4 pb-4 space-y-4">
                <p className="text-sm text-muted-foreground">{standard.description}</p>
                
                <div>
                  <p className="text-xs font-medium text-foreground mb-2">Key Requirements:</p>
                  <div className="flex flex-wrap gap-1.5">
                    {standard.keyRequirements.map((req) => (
                      <Badge key={req} variant="secondary" className="text-xs">
                        {req}
                      </Badge>
                    ))}
                  </div>
                </div>

                <Button
                  className="w-full"
                  onClick={(e) => {
                    e.stopPropagation();
                    onSelectStandard(standard);
                  }}
                >
                  Use {standard.shortName} as Standard
                </Button>
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}

export { PRESET_STANDARDS };
