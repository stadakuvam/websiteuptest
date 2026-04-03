export default function Privacy() {
  return (
    <div className="flex-1 bg-background py-16">
      <div className="container mx-auto px-4 max-w-3xl">
        <div className="mb-12">
          <h1 className="text-4xl font-extrabold tracking-tight mb-4">Privacy Policy</h1>
          <p className="text-muted-foreground">Last updated: {new Date().toLocaleDateString('en-US', { month: 'long', year: 'numeric' })}</p>
        </div>

        <div className="prose prose-slate dark:prose-invert max-w-none">
          <p>
            At WebsiteUpTest, we believe in keeping things simple and private. This Privacy Policy outlines how we handle data when you use our free website availability checker.
          </p>

          <h2 className="text-2xl font-bold mt-8 mb-4">1. Information We Do Not Collect</h2>
          <p>
            We are committed to your privacy:
          </p>
          <ul>
            <li>We <strong>do not</strong> require registration or account creation.</li>
            <li>We <strong>do not</strong> collect personal information such as your name, address, or phone number.</li>
            <li>We <strong>do not</strong> use invasive tracking scripts or third-party advertising networks.</li>
          </ul>

          <h2 className="text-2xl font-bold mt-8 mb-4">2. Information We Log</h2>
          <p>
            To operate the service effectively, we log the following data:
          </p>
          <ul>
            <li>
              <strong>Checked URLs and IP Addresses:</strong> When you submit a check, we temporarily store the target URL/IP and the results to power our "Recently Checked Websites" feature. This data is logged anonymously and is not tied to your identity.
            </li>
            <li>
              <strong>Standard Server Logs:</strong> Like almost all websites, our servers automatically log standard diagnostic information such as your masked IP address, browser type, and timestamp of the request. This is used strictly for preventing abuse (rate limiting) and maintaining server security.
            </li>
          </ul>

          <h2 className="text-2xl font-bold mt-8 mb-4">3. Cookies</h2>
          <p>
            We use only essential, functional cookies required to make the site work. We do not use third-party tracking cookies or advertising cookies.
          </p>

          <h2 className="text-2xl font-bold mt-8 mb-4">4. Third-Party Links</h2>
          <p>
            Our tool may display links to the websites you check. We are not responsible for the privacy practices or content of these external sites.
          </p>

          <h2 className="text-2xl font-bold mt-8 mb-4">5. Contact Us</h2>
          <p>
            If you have any questions about this Privacy Policy or our practices, please contact us at:
            <br />
            <a href="mailto:contact@websiteuptest.com" className="text-primary hover:underline">contact@websiteuptest.com</a>
          </p>
        </div>
      </div>
    </div>
  );
}
