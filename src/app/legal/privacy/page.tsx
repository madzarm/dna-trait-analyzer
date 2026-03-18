import Link from "next/link";

export const metadata = {
  title: "Privacy Policy - DNA Trait Analyzer",
  description: "Privacy Policy for the DNA Trait Analyzer application.",
};

export default function PrivacyPolicyPage() {
  return (
    <div className="min-h-screen bg-background">
      <div className="max-w-3xl mx-auto px-6 py-16">
        <Link
          href="/"
          className="text-sm text-muted-foreground hover:text-foreground transition-colors"
        >
          &larr; Back to DNA Trait Analyzer
        </Link>

        <div className="mt-8 space-y-8">
          <div>
            <h1 className="font-display text-3xl font-bold tracking-tight">
              Privacy Policy
            </h1>
            <p className="text-sm text-muted-foreground mt-2">
              Last updated: March 18, 2026
            </p>
            <div className="mt-4 rounded-lg border border-amber-500/30 bg-amber-500/10 px-4 py-3">
              <p className="text-sm text-amber-600 dark:text-amber-400 font-medium">
                TEMPLATE — This document requires review by a qualified attorney
                before use.
              </p>
            </div>
          </div>

          <section className="space-y-4">
            <h2 className="font-display text-xl font-semibold">1. Introduction</h2>
            <p className="text-sm text-muted-foreground leading-loose">
              [COMPANY NAME] (&quot;Company,&quot; &quot;we,&quot;
              &quot;us,&quot; or &quot;our&quot;) operates the DNA Trait
              Analyzer service (&quot;Service&quot;). This Privacy Policy
              explains how we collect, use, disclose, and safeguard your
              information — including genetic data — when you use our Service.
              Given the sensitive nature of genetic information, we are
              committed to transparency in our data practices.
            </p>
          </section>

          <section className="space-y-4">
            <h2 className="font-display text-xl font-semibold">
              2. Information We Collect
            </h2>

            <div className="space-y-3">
              <h3 className="font-display text-base font-medium">
                2.1 Information You Provide
              </h3>
              <ul className="list-disc list-inside text-sm text-muted-foreground space-y-1 ml-4 leading-loose">
                <li>
                  <strong>Account information:</strong> Email address, name, and
                  authentication credentials (if you create an account)
                </li>
                <li>
                  <strong>Genetic data:</strong> Raw DNA data files you upload
                  for analysis (e.g., from 23andMe, AncestryDNA, MyHeritage, or
                  FTDNA)
                </li>
                <li>
                  <strong>Analysis requests:</strong> The specific traits you
                  ask to be analyzed
                </li>
                <li>
                  <strong>Payment information:</strong> Processed securely
                  through Stripe; we do not store your full credit card number
                </li>
              </ul>
            </div>

            <div className="space-y-3">
              <h3 className="font-display text-base font-medium">
                2.2 Information Collected Automatically
              </h3>
              <ul className="list-disc list-inside text-sm text-muted-foreground space-y-1 ml-4 leading-loose">
                <li>
                  <strong>Usage data:</strong> Pages visited, features used,
                  timestamps, and interaction patterns
                </li>
                <li>
                  <strong>Device information:</strong> Browser type, operating
                  system, and device identifiers
                </li>
                <li>
                  <strong>Cookies and similar technologies:</strong> As
                  described in Section 8
                </li>
              </ul>
            </div>
          </section>

          <section className="space-y-4">
            <h2 className="font-display text-xl font-semibold">
              3. How We Handle Your Genetic Data
            </h2>
            <p className="text-sm text-muted-foreground leading-loose">
              We understand that genetic data is among the most sensitive
              personal information. Here is exactly how we handle it:
            </p>
            <ul className="list-disc list-inside text-sm text-muted-foreground space-y-2 ml-4 leading-loose">
              <li>
                <strong>Processing:</strong> Your raw DNA file is processed
                server-side to extract specific SNP (Single Nucleotide
                Polymorphism) identifiers relevant to your requested analysis
              </li>
              <li>
                <strong>Temporary storage:</strong> Raw DNA files and extracted
                SNP data are held in temporary server memory and automatically
                deleted after 1 hour
              </li>
              <li>
                <strong>No permanent raw storage:</strong> We do not permanently
                store your complete raw DNA file
              </li>
              <li>
                <strong>AI processing:</strong> Selected SNP identifiers and
                genotype data are sent to Anthropic&apos;s Claude API for
                analysis. This data is subject to{" "}
                <strong>Anthropic&apos;s data usage policies</strong>
              </li>
              <li>
                <strong>Report storage:</strong> If you have an account,
                generated analysis reports (which contain derived insights, not
                raw genetic data) may be stored for your future reference
              </li>
            </ul>
          </section>

          <section className="space-y-4">
            <h2 className="font-display text-xl font-semibold">
              4. How We Use Your Information
            </h2>
            <ul className="list-disc list-inside text-sm text-muted-foreground space-y-1 ml-4 leading-loose">
              <li>To provide, maintain, and improve the Service</li>
              <li>
                To generate genetic trait analyses based on your uploaded data
              </li>
              <li>
                To process payments and manage your account
              </li>
              <li>
                To communicate with you about the Service, including support
                requests
              </li>
              <li>To detect, prevent, and address technical issues</li>
              <li>
                To comply with legal obligations
              </li>
            </ul>
            <p className="text-sm text-muted-foreground leading-loose font-medium">
              We do NOT sell your genetic data to third parties. We do NOT use
              your genetic data for research purposes without your explicit
              consent.
            </p>
          </section>

          <section className="space-y-4">
            <h2 className="font-display text-xl font-semibold">
              5. Third-Party Services
            </h2>
            <p className="text-sm text-muted-foreground leading-loose">
              The Service integrates with the following third-party providers:
            </p>
            <ul className="list-disc list-inside text-sm text-muted-foreground space-y-2 ml-4 leading-loose">
              <li>
                <strong>Anthropic (Claude API):</strong> Powers our AI analysis
                engine. Selected SNP data is sent to Anthropic for processing.
                See Anthropic&apos;s privacy policy for their data handling
                practices.
              </li>
              <li>
                <strong>Supabase:</strong> Provides authentication and database
                services for account management and report storage.
              </li>
              <li>
                <strong>Stripe:</strong> Processes payment transactions. We do
                not have access to your full payment card details.
              </li>
              <li>
                <strong>Vercel:</strong> Hosts the Service infrastructure.
              </li>
            </ul>
          </section>

          <section className="space-y-4">
            <h2 className="font-display text-xl font-semibold">
              6. Data Retention
            </h2>
            <ul className="list-disc list-inside text-sm text-muted-foreground space-y-1 ml-4 leading-loose">
              <li>
                <strong>Raw DNA files:</strong> Deleted automatically within 1
                hour of upload
              </li>
              <li>
                <strong>Temporary session data:</strong> Deleted after 1 hour
              </li>
              <li>
                <strong>Analysis reports:</strong> Retained while your account
                is active, or until you request deletion
              </li>
              <li>
                <strong>Account information:</strong> Retained until you delete
                your account
              </li>
              <li>
                <strong>Payment records:</strong> Retained as required by
                applicable tax and financial regulations
              </li>
            </ul>
          </section>

          <section className="space-y-4">
            <h2 className="font-display text-xl font-semibold">
              7. Your Rights
            </h2>

            <div className="space-y-3">
              <h3 className="font-display text-base font-medium">
                7.1 CCPA Rights (California Residents)
              </h3>
              <p className="text-sm text-muted-foreground leading-loose">
                Under the California Consumer Privacy Act, you have the right
                to:
              </p>
              <ul className="list-disc list-inside text-sm text-muted-foreground space-y-1 ml-4 leading-loose">
                <li>
                  <strong>Know:</strong> Request what personal information we
                  collect, use, and disclose
                </li>
                <li>
                  <strong>Delete:</strong> Request deletion of your personal
                  information
                </li>
                <li>
                  <strong>Opt-out:</strong> Opt out of the sale of personal
                  information (we do not sell your data)
                </li>
                <li>
                  <strong>Non-discrimination:</strong> Not be discriminated
                  against for exercising your privacy rights
                </li>
              </ul>
            </div>

            <div className="space-y-3">
              <h3 className="font-display text-base font-medium">
                7.2 GDPR Rights (EEA Residents)
              </h3>
              <p className="text-sm text-muted-foreground leading-loose">
                Under the General Data Protection Regulation, you have the right
                to:
              </p>
              <ul className="list-disc list-inside text-sm text-muted-foreground space-y-1 ml-4 leading-loose">
                <li>
                  <strong>Access:</strong> Obtain a copy of your personal data
                </li>
                <li>
                  <strong>Rectification:</strong> Correct inaccurate personal
                  data
                </li>
                <li>
                  <strong>Erasure:</strong> Request deletion of your personal
                  data
                </li>
                <li>
                  <strong>Restriction:</strong> Restrict processing of your
                  personal data
                </li>
                <li>
                  <strong>Data portability:</strong> Receive your data in a
                  structured, machine-readable format
                </li>
                <li>
                  <strong>Object:</strong> Object to processing of your personal
                  data
                </li>
                <li>
                  <strong>Withdraw consent:</strong> Withdraw consent at any
                  time where processing is based on consent
                </li>
              </ul>
              <p className="text-sm text-muted-foreground leading-loose">
                <strong>Lawful basis for processing:</strong> We process genetic
                data based on your explicit consent (GDPR Article 9(2)(a)). You
                may withdraw consent at any time. For account data, we process
                based on contractual necessity.
              </p>
            </div>
          </section>

          <section className="space-y-4">
            <h2 className="font-display text-xl font-semibold">8. Cookies</h2>
            <p className="text-sm text-muted-foreground leading-loose">
              We use the following types of cookies:
            </p>
            <ul className="list-disc list-inside text-sm text-muted-foreground space-y-1 ml-4 leading-loose">
              <li>
                <strong>Essential cookies:</strong> Required for the Service to
                function (e.g., session management, authentication)
              </li>
              <li>
                <strong>Analytics cookies:</strong> Help us understand how the
                Service is used (only with your consent)
              </li>
            </ul>
            <p className="text-sm text-muted-foreground leading-loose">
              You can manage your cookie preferences through the cookie consent
              banner or your browser settings.
            </p>
          </section>

          <section className="space-y-4">
            <h2 className="font-display text-xl font-semibold">9. Data Security</h2>
            <p className="text-sm text-muted-foreground leading-loose">
              We implement industry-standard security measures to protect your
              data, including encryption in transit (TLS) and at rest. However,
              no method of electronic transmission or storage is 100% secure. We
              cannot guarantee absolute security of your data.
            </p>
          </section>

          <section className="space-y-4">
            <h2 className="font-display text-xl font-semibold">
              10. Children&apos;s Privacy
            </h2>
            <p className="text-sm text-muted-foreground leading-loose">
              The Service is not intended for individuals under the age of 18.
              We do not knowingly collect genetic data or personal information
              from minors. If you believe we have collected data from a minor,
              please contact us immediately.
            </p>
          </section>

          <section className="space-y-4">
            <h2 className="font-display text-xl font-semibold">
              11. Changes to This Policy
            </h2>
            <p className="text-sm text-muted-foreground leading-loose">
              We may update this Privacy Policy from time to time. We will
              notify you of material changes by posting the updated policy on
              this page, updating the &quot;Last updated&quot; date, and, where
              required, seeking renewed consent for material changes to how we
              process genetic data.
            </p>
          </section>

          <section className="space-y-4">
            <h2 className="font-display text-xl font-semibold">12. Contact Us</h2>
            <p className="text-sm text-muted-foreground leading-loose">
              For any privacy-related questions, data access requests, or to
              exercise your rights, please contact:
            </p>
            <div className="text-sm text-muted-foreground">
              <p>[COMPANY NAME]</p>
              <p>[COMPANY ADDRESS]</p>
              <p>[CONTACT EMAIL]</p>
            </div>
          </section>
        </div>
      </div>
    </div>
  );
}
