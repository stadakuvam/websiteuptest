export default function Terms() {
  return (
    <div className="flex-1 bg-background py-16">
      <div className="container mx-auto px-4 max-w-3xl">
        <div className="mb-12">
          <h1 className="text-4xl font-extrabold tracking-tight mb-4">Terms of Use</h1>
          <p className="text-muted-foreground">Last updated: {new Date().toLocaleDateString('en-US', { month: 'long', year: 'numeric' })}</p>
        </div>

        <div className="prose prose-slate dark:prose-invert max-w-none">
          <p>
            Welcome to WebsiteUpTest. By accessing and using this website, you accept and agree to be bound by the terms and provisions of this agreement.
          </p>

          <h2 className="text-2xl font-bold mt-8 mb-4">1. Nature of Service</h2>
          <p>
            WebsiteUpTest is a free tool provided for informational purposes only. It allows users to check the network availability of URLs and IP addresses from multiple geographic locations.
          </p>

          <h2 className="text-2xl font-bold mt-8 mb-4">2. Acceptable Use and Rate Limiting</h2>
          <p>
            You agree to use this service reasonably and not to abuse it. 
          </p>
          <ul>
            <li>Automated scraping or abusive querying of our tool is strictly prohibited.</li>
            <li>We implement rate limiting to ensure the service remains available for everyone.</li>
            <li>We reserve the right to block IPs that generate excessive requests or attempt to use our service for malicious purposes (such as DDoS amplification).</li>
          </ul>

          <h2 className="text-2xl font-bold mt-8 mb-4">3. No SLA or Guarantees</h2>
          <p>
            This service is provided "AS IS" and "AS AVAILABLE" without any warranties of any kind. 
          </p>
          <ul>
            <li>We do not guarantee 100% uptime for our own service.</li>
            <li>We do not guarantee the absolute accuracy of the check results. Network conditions change rapidly, and our probes may occasionally encounter temporary localized issues.</li>
            <li>We are not responsible for any decisions made or damages incurred based on the data provided by our tool.</li>
          </ul>

          <h2 className="text-2xl font-bold mt-8 mb-4">4. Discontinuation of Service</h2>
          <p>
            We reserve the right to modify, suspend, or discontinue the service (or any part thereof) at any time, with or without notice, without liability to you or to any third party.
          </p>

          <h2 className="text-2xl font-bold mt-8 mb-4">5. Contact Information</h2>
          <p>
            For any questions regarding these Terms of Use, please contact us at:
            <br />
            <a href="mailto:contact@websiteuptest.com" className="text-primary hover:underline">contact@websiteuptest.com</a>
          </p>
        </div>
      </div>
    </div>
  );
}
