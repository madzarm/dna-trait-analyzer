export interface EmailTemplate {
  subject: string;
  html: string;
}

export const welcomeEmail: EmailTemplate = {
  subject: "Welcome to [APP_NAME] — Your DNA, Your Insights",
  html: `<!DOCTYPE html>
<html>
<head><meta charset="utf-8"><meta name="viewport" content="width=device-width,initial-scale=1"></head>
<body style="margin:0;padding:0;background-color:#f9fafb;font-family:-apple-system,BlinkMacSystemFont,'Segoe UI',Roboto,sans-serif">
  <div style="max-width:560px;margin:0 auto;padding:40px 24px">
    <div style="background:#fff;border-radius:12px;padding:32px;border:1px solid #e5e7eb">
      <h1 style="margin:0 0 8px;font-size:24px;font-weight:700;color:#111827">Welcome to [APP_NAME]</h1>
      <p style="margin:0 0 24px;font-size:15px;color:#6b7280;line-height:1.6">
        Hi [USER_NAME],
      </p>
      <p style="margin:0 0 16px;font-size:15px;color:#374151;line-height:1.6">
        Thanks for signing up! You're ready to explore what your genes say about any trait — from caffeine metabolism to eye color to athletic performance.
      </p>
      <h2 style="margin:0 0 12px;font-size:16px;font-weight:600;color:#111827">Getting started is easy:</h2>
      <ol style="margin:0 0 24px;padding-left:20px;font-size:15px;color:#374151;line-height:1.8">
        <li>Export your raw DNA data from 23andMe, AncestryDNA, MyHeritage, or FTDNA</li>
        <li>Upload your file to [APP_NAME]</li>
        <li>Ask about any trait and get an AI-powered analysis backed by published research</li>
      </ol>
      <div style="text-align:center;margin:24px 0">
        <a href="[CTA_URL]" style="display:inline-block;background:#111827;color:#fff;text-decoration:none;padding:12px 32px;border-radius:8px;font-size:15px;font-weight:500">
          Upload Your DNA Data
        </a>
      </div>
      <p style="margin:24px 0 0;font-size:13px;color:#9ca3af;line-height:1.5">
        Remember: [APP_NAME] is for educational purposes only and does not provide medical advice. Always consult a healthcare professional for medical decisions.
      </p>
    </div>
    <p style="margin:16px 0 0;text-align:center;font-size:12px;color:#9ca3af">
      [APP_NAME] &mdash; AI-Powered Genetic Trait Analysis
    </p>
  </div>
</body>
</html>`,
};

export const uploadReminderEmail: EmailTemplate = {
  subject: "Your DNA insights are waiting — upload your data to get started",
  html: `<!DOCTYPE html>
<html>
<head><meta charset="utf-8"><meta name="viewport" content="width=device-width,initial-scale=1"></head>
<body style="margin:0;padding:0;background-color:#f9fafb;font-family:-apple-system,BlinkMacSystemFont,'Segoe UI',Roboto,sans-serif">
  <div style="max-width:560px;margin:0 auto;padding:40px 24px">
    <div style="background:#fff;border-radius:12px;padding:32px;border:1px solid #e5e7eb">
      <h1 style="margin:0 0 8px;font-size:24px;font-weight:700;color:#111827">Ready to discover your traits?</h1>
      <p style="margin:0 0 24px;font-size:15px;color:#6b7280;line-height:1.6">
        Hi [USER_NAME],
      </p>
      <p style="margin:0 0 16px;font-size:15px;color:#374151;line-height:1.6">
        We noticed you signed up for [APP_NAME] but haven't uploaded your DNA data yet. Your genetic insights are just one upload away!
      </p>
      <p style="margin:0 0 16px;font-size:15px;color:#374151;line-height:1.6">
        Here are some popular traits people explore:
      </p>
      <ul style="margin:0 0 24px;padding-left:20px;font-size:15px;color:#374151;line-height:1.8">
        <li>Caffeine sensitivity and metabolism</li>
        <li>Sleep patterns and chronotype</li>
        <li>Muscle fiber composition</li>
        <li>Lactose tolerance</li>
        <li>Eye color genetics</li>
      </ul>
      <div style="text-align:center;margin:24px 0">
        <a href="[CTA_URL]" style="display:inline-block;background:#111827;color:#fff;text-decoration:none;padding:12px 32px;border-radius:8px;font-size:15px;font-weight:500">
          Upload Your DNA Data
        </a>
      </div>
      <div style="background:#f9fafb;border-radius:8px;padding:16px;margin:24px 0 0">
        <p style="margin:0;font-size:13px;color:#6b7280;line-height:1.5">
          <strong>Need your raw DNA file?</strong> You can export it from your testing provider's website: 23andMe (Settings &rarr; 23andMe Data), AncestryDNA (Settings &rarr; Download DNA Data), MyHeritage (DNA &rarr; Download), or FTDNA (Account Settings &rarr; Download Raw Data).
        </p>
      </div>
    </div>
    <p style="margin:16px 0 0;text-align:center;font-size:12px;color:#9ca3af">
      [APP_NAME] &mdash; AI-Powered Genetic Trait Analysis
    </p>
  </div>
</body>
</html>`,
};

export const analysisCompleteEmail: EmailTemplate = {
  subject: "Your trait analysis is ready — view your results",
  html: `<!DOCTYPE html>
<html>
<head><meta charset="utf-8"><meta name="viewport" content="width=device-width,initial-scale=1"></head>
<body style="margin:0;padding:0;background-color:#f9fafb;font-family:-apple-system,BlinkMacSystemFont,'Segoe UI',Roboto,sans-serif">
  <div style="max-width:560px;margin:0 auto;padding:40px 24px">
    <div style="background:#fff;border-radius:12px;padding:32px;border:1px solid #e5e7eb">
      <h1 style="margin:0 0 8px;font-size:24px;font-weight:700;color:#111827">Your analysis is ready!</h1>
      <p style="margin:0 0 24px;font-size:15px;color:#6b7280;line-height:1.6">
        Hi [USER_NAME],
      </p>
      <p style="margin:0 0 16px;font-size:15px;color:#374151;line-height:1.6">
        Great news — your trait analysis has been completed. We examined relevant SNPs from your genetic data and cross-referenced them with published research to generate your personalized report.
      </p>
      <p style="margin:0 0 24px;font-size:15px;color:#374151;line-height:1.6">
        Your report includes:
      </p>
      <ul style="margin:0 0 24px;padding-left:20px;font-size:15px;color:#374151;line-height:1.8">
        <li>Your genetic profile for the requested trait</li>
        <li>Matched SNPs with evidence strength ratings</li>
        <li>AI-generated interpretation with research citations</li>
        <li>Confidence score based on available evidence</li>
      </ul>
      <div style="text-align:center;margin:24px 0">
        <a href="[CTA_URL]" style="display:inline-block;background:#111827;color:#fff;text-decoration:none;padding:12px 32px;border-radius:8px;font-size:15px;font-weight:500">
          View Your Results
        </a>
      </div>
      <p style="margin:24px 0 0;font-size:13px;color:#9ca3af;line-height:1.5">
        This analysis is AI-generated for educational purposes only. It is not medical advice and may contain inaccuracies. Consult a healthcare professional or genetic counselor for medical guidance.
      </p>
    </div>
    <p style="margin:16px 0 0;text-align:center;font-size:12px;color:#9ca3af">
      [APP_NAME] &mdash; AI-Powered Genetic Trait Analysis
    </p>
  </div>
</body>
</html>`,
};

export const freeTierLimitEmail: EmailTemplate = {
  subject: "You've used all your free analyses — unlock unlimited access",
  html: `<!DOCTYPE html>
<html>
<head><meta charset="utf-8"><meta name="viewport" content="width=device-width,initial-scale=1"></head>
<body style="margin:0;padding:0;background-color:#f9fafb;font-family:-apple-system,BlinkMacSystemFont,'Segoe UI',Roboto,sans-serif">
  <div style="max-width:560px;margin:0 auto;padding:40px 24px">
    <div style="background:#fff;border-radius:12px;padding:32px;border:1px solid #e5e7eb">
      <h1 style="margin:0 0 8px;font-size:24px;font-weight:700;color:#111827">You've hit your free tier limit</h1>
      <p style="margin:0 0 24px;font-size:15px;color:#6b7280;line-height:1.6">
        Hi [USER_NAME],
      </p>
      <p style="margin:0 0 16px;font-size:15px;color:#374151;line-height:1.6">
        You've used all of your free trait analyses on [APP_NAME]. We hope you've enjoyed exploring your genetic traits so far!
      </p>
      <p style="margin:0 0 16px;font-size:15px;color:#374151;line-height:1.6">
        Upgrade to continue analyzing unlimited traits. With a paid plan you get:
      </p>
      <ul style="margin:0 0 24px;padding-left:20px;font-size:15px;color:#374151;line-height:1.8">
        <li><strong>Unlimited trait analyses</strong> — explore any trait you're curious about</li>
        <li><strong>Saved reports</strong> — access your analysis history anytime</li>
        <li><strong>Shareable reports</strong> — generate links to share with others</li>
        <li><strong>PDF export</strong> — download polished reports for your records</li>
        <li><strong>ClinVar integration</strong> — enhanced clinical variant data</li>
      </ul>
      <div style="text-align:center;margin:24px 0">
        <a href="[CTA_URL]" style="display:inline-block;background:#111827;color:#fff;text-decoration:none;padding:12px 32px;border-radius:8px;font-size:15px;font-weight:500">
          Upgrade Now
        </a>
      </div>
      <p style="margin:24px 0 0;font-size:13px;color:#9ca3af;line-height:1.5">
        Questions? Reply to this email or reach out at [CONTACT EMAIL]. We're happy to help.
      </p>
    </div>
    <p style="margin:16px 0 0;text-align:center;font-size:12px;color:#9ca3af">
      [APP_NAME] &mdash; AI-Powered Genetic Trait Analysis
    </p>
  </div>
</body>
</html>`,
};
