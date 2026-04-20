2:I[4209,["231","static/chunks/231-12a35a5e0b0b1f40.js","931","static/chunks/app/page-aa43203883d315d8.js"],"default"]
9:I[4080,["231","static/chunks/231-12a35a5e0b0b1f40.js","610","static/chunks/610-0d20b185c8951c99.js","185","static/chunks/app/layout-158c31b8714bbc26.js"],""]
a:I[8871,["231","static/chunks/231-12a35a5e0b0b1f40.js","610","static/chunks/610-0d20b185c8951c99.js","185","static/chunks/app/layout-158c31b8714bbc26.js"],"default"]
b:I[9275,[],""]
c:I[1343,[],""]
d:I[231,["231","static/chunks/231-12a35a5e0b0b1f40.js","610","static/chunks/610-0d20b185c8951c99.js","185","static/chunks/app/layout-158c31b8714bbc26.js"],""]
e:I[7172,["231","static/chunks/231-12a35a5e0b0b1f40.js","610","static/chunks/610-0d20b185c8951c99.js","185","static/chunks/app/layout-158c31b8714bbc26.js"],"default"]
3:T1e5d,JSON (JavaScript Object Notation) is the de facto data interchange format of the modern web. From REST APIs to configuration files, JSON is everywhere — and keeping it readable is essential for developer productivity. Whether you are a beginner just learning about APIs or a senior engineer debugging a production issue, a **JSON formatter** is a tool you will reach for every single day.

## What is JSON?

JSON is a lightweight, text-based format for storing and transporting structured data. It uses human-readable key-value pairs, arrays, and nested objects that map naturally to data structures in virtually every programming language. A simple JSON object looks like this:

```json
{
  "name": "ToolHub",
  "version": 2,
  "tools": ["JSON Formatter", "Word Counter", "Password Generator"],
  "free": true
}
```

JSON was derived from JavaScript object literal syntax but is language-independent. Python, Java, Go, Ruby, PHP, and hundreds of other languages all have native JSON libraries, making it the universal language of data exchange on the web.

## Why JSON Became the Standard

Before JSON, XML dominated as the web data format. While XML is powerful, it is verbose and harder to read. A simple list of three user names in XML might span fifteen lines; in JSON, it is four. This combination of readability and compactness, along with its tight integration with JavaScript, made JSON the clear winner.

Today, virtually every public REST API returns JSON. The Twitter API, GitHub API, Google Maps API, Stripe payment API — they all speak JSON. If you work in web development, you are reading and writing JSON every day.

## Why Do You Need a JSON Formatter?

When JSON is transmitted over the internet, it is almost always minified — all whitespace stripped to reduce payload size. A typical API response might look like this:

`{"user":{"id":1,"name":"Alice","email":"alice@example.com","roles":["admin","editor"],"settings":{"theme":"dark","notifications":true}}}`

That is valid JSON, but practically unreadable. A **free JSON formatter** adds proper indentation, line breaks, and hierarchical structure back to minified JSON — turning that dense line into a well-organised, human-readable document.

> **Try it now:** Paste any minified JSON into our [JSON Formatter tool](/tools/json-formatter) and get clean, readable output instantly — no signup required.

### Key Benefits of Using a JSON Formatter

**Debugging APIs**: When your fetch request returns a wall of compressed text, a formatter instantly makes the response comprehensible. You can see exactly what data you received and spot missing fields immediately.

**Error detection and validation**: Most formatters also validate JSON syntax. If you have a missing comma, an extra bracket, or unquoted keys, the formatter tells you exactly where the problem is — often with a line number and character position.

**Code reviews**: Reviewing JSON changes in pull requests is dramatically easier when the JSON is properly formatted. Minified JSON diffs are nearly impossible to review meaningfully.

**Configuration files**: Many applications use JSON for configuration — package.json, .eslintrc.json, tsconfig.json. Keeping these files well-formatted makes them much easier to maintain.

**Documentation**: When writing API documentation or tutorials, formatted JSON examples are far clearer for readers than minified blobs.

## How a JSON Formatter Works

Under the hood, a JSON formatter does two things: it parses the input and re-serialises it with formatting. In JavaScript, this is achieved with two native functions:

1. `JSON.parse(input)` — converts the JSON string into a JavaScript object
2. `JSON.stringify(object, null, 2)` — converts the object back to a string with 2-space indentation

The second argument to `JSON.stringify` (null) is a replacer function not used here, and the third argument (2) is the number of spaces for indentation. Some formatters offer 2-space, 4-space, or tab indentation options.

If `JSON.parse` throws a `SyntaxError`, the formatter catches it and reports the problem to the user rather than crashing silently.

Our [JSON Formatter](/tools/json-formatter) runs entirely in your browser — no data is ever sent to a server. This makes it safe to use with sensitive API keys, private data, or production credentials.

## Common JSON Errors and How to Fix Them

**Missing quotes on keys**: JSON requires all keys to be double-quoted strings. `{name: "Alice"}` is invalid. The correct form is `{"name": "Alice"}`.

**Trailing commas**: Unlike modern JavaScript, JSON does not allow trailing commas after the last item in an object or array. `[1, 2, 3,]` will throw a parse error.

**Single quotes**: JSON only accepts double quotes for both keys and string values. `{'key': 'value'}` is invalid.

**Undefined and NaN**: These JavaScript-specific values do not exist in the JSON specification. Use `null` instead.

**Comments**: JSON does not support comments. If you need comments in a configuration file, consider JSONC or YAML instead.

## JSON vs. Other Data Formats

| Format | Human Readable | Comments | Schema | Use Case |
|--------|:--------------:|:--------:|:------:|----------|
| JSON   | Yes | No | JSON Schema | REST APIs, configs |
| YAML   | Yes | Yes | Yes | DevOps configs |
| XML    | Verbose | Yes | XSD | Legacy systems |
| CSV    | Yes | No | No | Tabular data |
| TOML   | Yes | Yes | No | App configuration |

Need to convert CSV data to JSON? Try our [CSV to JSON converter](/tools/csv-to-json) for instant, accurate conversion.

## Tips for Working with JSON Daily

- Always format JSON before adding it to documentation or sharing it with colleagues.
- Use a linter like `eslint-plugin-json` to automatically format JSON files in your editor.
- When building APIs, return pretty-printed JSON in development mode and minified JSON in production.
- Keep your `package.json` and other config files well-formatted — they are important project documents your whole team reads.
- If your JSON contains encoded data, use our [Base64 decoder](/tools/base64) to inspect the raw values.

## Frequently Asked Questions

**Q: Is a JSON formatter the same as a JSON validator?**
Most online JSON formatters include validation. When you paste invalid JSON, the tool reports the exact line and character where the syntax error occurred. Our [JSON Formatter](/tools/json-formatter) validates and formats in one step.

**Q: Does formatting JSON change its meaning?**
No. Whitespace (spaces, tabs, newlines) outside of string values is ignored by JSON parsers. Formatted and minified JSON are semantically identical.

**Q: Is it safe to paste API responses into an online formatter?**
Only if the tool processes data client-side (in your browser). Our JSON Formatter never sends your data to a server — all processing happens locally, so your API keys and sensitive data stay private.

**Q: What is the best indentation for JSON — 2 spaces or 4?**
Both are widely used. 2-space indentation is the Node.js/JavaScript default; 4-space is common in Python projects. The most important thing is consistency within your project.

**Q: Can I format large JSON files online?**
Yes — our JSON Formatter handles large files efficiently in the browser. For extremely large files (50MB+), a command-line tool like `jq` may be faster.

## Conclusion

A JSON formatter is one of the most-used tools in a developer's toolkit. Whether you are debugging an API response, reviewing a pull request, or cleaning up a messy configuration file, a fast and reliable formatter saves significant time and mental energy. [Try ToolHub's free JSON Formatter](/tools/json-formatter) — no signup, no data stored, works on any device. Bookmark it today.4:T1e7d,Formatting JSON consistently and correctly is a fundamental skill for web developers. Clean JSON improves readability, reduces bugs, and makes collaboration far easier. This guide covers everything from indentation choices to naming conventions, schema validation, and tooling that keeps your JSON spotless across a team.

> **Quick start:** Use our free [JSON Formatter](/tools/json-formatter) to instantly clean up any messy or minified JSON — paste and format in one click.

## The Basics: Indentation and Structure

The most visible aspect of JSON formatting is indentation. The two dominant conventions are **2-space** and **4-space** indentation. Neither is objectively correct — what matters is consistency within a project.

**2-space indentation** is the default for most Node.js and JavaScript projects. It produces compact files that are easy to read without excessive horizontal scroll on nested objects.

**4-space indentation** is preferred in Python-heavy projects and some enterprise environments where deeper nesting must remain readable.

Tab indentation exists but is less common in JSON since JSON is often generated programmatically and tabs can behave inconsistently across editors.

For project configuration files like `package.json` or `.prettierrc`, the built-in tools typically enforce their own format — follow those rather than imposing your own.

## Naming Conventions for JSON Keys

JSON keys are strings, which means technically anything goes. In practice, there are four common naming styles:

**camelCase** (firstName, createdAt) — The JavaScript standard. Best for JSON consumed directly by JavaScript frontends.

**snake_case** (first_name, created_at) — Common in Python and Ruby APIs. Readable but inconsistent with JS variable names.

**PascalCase** (FirstName, CreatedAt) — Rare in JSON, more common in C# / .NET environments.

**kebab-case** (first-name, created-at) — Avoided in JSON because hyphens cannot be used in JavaScript identifier names without bracket notation.

The key rule: **pick one convention and apply it uniformly** across your entire API. Mixed conventions create bugs and confusion.

## Ordering Keys for Readability

JSON does not specify key ordering — parsers may return keys in any order. However, for human-readable files, a consistent ordering convention greatly improves comprehension:

1. Identifier fields first (id, type, name)
2. Required fields before optional fields
3. Timestamps last (createdAt, updatedAt, deletedAt)
4. Nested objects at the end

Many JSON formatters include an option to sort keys alphabetically. This is useful for diffs — alphabetically sorted keys make it obvious when a field was added or removed.

## Handling Null and Optional Fields

A frequent question is whether to include fields with null values or omit them entirely. Both approaches are valid, but each has trade-offs.

**Include null fields**: Your API response has a consistent shape on every call. Consumers know what fields to expect and can write simple, predictable code.

**Omit null fields**: Smaller payload size. Useful when most fields are optional and only a few are typically populated.

A hybrid approach works well: always include required identifier and status fields even if null, but omit optional descriptive fields when not set.

## Validating JSON with a Schema

JSON Schema is a powerful tool for validating that JSON data conforms to an expected structure. A simple schema looks like this:

```json
{
  "$schema": "http://json-schema.org/draft-07/schema",
  "type": "object",
  "required": ["id", "name", "email"],
  "properties": {
    "id": { "type": "integer" },
    "name": { "type": "string", "minLength": 1 },
    "email": { "type": "string", "format": "email" },
    "age": { "type": "integer", "minimum": 0, "maximum": 120 }
  }
}
```

Libraries like `ajv` (JavaScript) and `jsonschema` (Python) can validate data against a schema at runtime, catching invalid data before it reaches your database.

## JSON in Code Reviews

One of the highest-value applications of consistent JSON formatting is in code reviews. When configuration files, fixtures, or mock API responses are committed to version control, well-formatted JSON makes diffs meaningful. A change to a single value shows up as one changed line, not a complete file rewrite.

Use tools like Prettier or ESLint with `eslint-plugin-json` to automatically format JSON files on save or as a pre-commit hook. This eliminates formatting debates in pull requests entirely.

## Minification for Production

While formatted JSON is ideal for development, minified JSON is better for production API responses. Removing all whitespace from a 50KB JSON response can reduce it to 30KB — a 40% saving that adds up significantly at scale.

Most backend frameworks offer a "pretty print" mode for development and minified output for production. In Express.js, setting `app.set('json spaces', 2)` in development and leaving it unset in production handles this automatically.

## Practical Tips for Daily JSON Work

- Keep a [JSON Formatter](/tools/json-formatter) bookmarked for quick debugging.
- When pasting JSON into documentation or chat messages, always format it first.
- Use `JSON.stringify(data, null, 2)` in `console.log` calls during debugging to get readable output.
- In VS Code, the built-in "Format Document" command formats JSON files automatically.
- If your JSON includes encoded strings, our [Base64 decoder](/tools/base64) can help inspect embedded data.

## Working with Deeply Nested JSON

Deep nesting is a JSON anti-pattern. If you find yourself with 5 or more levels of nesting, consider whether the data model should be flattened or split into separate API endpoints. A good rule of thumb is to keep nesting to 3 levels maximum for readability.

Need to work with tabular data instead? Our [CSV to JSON converter](/tools/csv-to-json) can flatten structured data into clean JSON arrays.

## JSON Comments: A Workaround

Standard JSON does not support comments, which is a pain point for configuration files. Common workarounds include:
- Using a dedicated key like `"_comment"` for documentation purposes
- Switching to JSONC (JSON with Comments) supported by VS Code and TypeScript configs
- Migrating to YAML for config files where comments add significant value

## Frequently Asked Questions

**Q: Should I use 2 or 4 spaces to format JSON?**
Either works — what matters most is consistency. Most JavaScript and Node.js projects default to 2 spaces; Python projects often use 4. Check if your project already has a Prettier or ESLint config that enforces a choice.

**Q: How do I format JSON in VS Code?**
Open the JSON file, press `Shift+Alt+F` (Windows/Linux) or `Shift+Option+F` (Mac), or right-click and select "Format Document." VS Code uses your editor settings for indentation.

**Q: How do I format JSON in a terminal?**
Use the `jq` command: `cat file.json | jq .` — this pretty-prints any JSON file. You can also use `python3 -m json.tool file.json` without any extra installation.

**Q: Why is my JSON throwing a "trailing comma" error?**
JSON (unlike JavaScript) does not allow trailing commas after the last item in an array or object. Remove the extra comma and re-validate using our [JSON Formatter](/tools/json-formatter).

## Conclusion

Good JSON formatting is a simple discipline with outsized rewards. It makes debugging faster, collaboration smoother, and code reviews more productive. By adopting consistent conventions for indentation, key naming, null handling, and schema validation, you write cleaner APIs and more maintainable applications. [Use ToolHub's JSON Formatter](/tools/json-formatter) anytime you need to quickly format or validate JSON — no setup, no friction, just clean results.5:T1e86,Password security is the first and most important line of defence against account compromise, identity theft, and data breaches. Despite decades of warnings, password reuse and weak passwords remain the most common causes of security incidents worldwide. This guide covers everything you need to know to protect yourself in 2024.

> **Quick tool:** Use our free [Password Generator](/tools/password-generator) to create cryptographically random, strong passwords instantly — right in your browser.

## Why Passwords Are Still Critical

You might assume that modern technology — biometrics, hardware keys, two-factor authentication — has made passwords obsolete. It has not. Passwords remain the primary authentication mechanism for the vast majority of online accounts. Even when you use Google or Apple to sign in, there is a password behind that account.

The scale of the problem is staggering. The "Have I Been Pwned" database tracks billions of compromised credentials from thousands of data breaches. Studies consistently show that the most common passwords include "123456", "password", and "qwerty" — choices that an attacker can crack in under a second.

## What Makes a Password Strong?

Security researchers and standards bodies, including NIST (the US National Institute of Standards and Technology), have updated their guidance significantly over the past decade. Here is what actually matters:

**Length is the most important factor.** A 16-character password of random words is far stronger than an 8-character password with complex symbols. Every additional character multiplies the number of possible combinations exponentially. A 12-character password has roughly 95¹² possible combinations — that is over 540 quadrillion possibilities.

**Randomness matters more than complexity.** The old advice to replace letters with numbers (like "p@ssw0rd") is largely useless — attackers account for these substitutions in their dictionary attacks. True randomness, achieved by a [password generator](/tools/password-generator), is far harder to crack than a human-constructed "complex" password.

**Avoid predictable patterns.** Birthdates, pet names, favourite sports teams, and keyboard patterns like "qwerty123" are among the first things attackers try.

**Never reuse passwords.** If any service you use suffers a breach, attackers will immediately try those credentials on other popular services. This attack, known as credential stuffing, is responsible for the vast majority of account compromises.

## The NIST Password Guidelines

NIST SP 800-63B changed the conventional wisdom on passwords. Key recommendations include:

- Minimum length of 8 characters (longer is strongly encouraged)
- No mandatory complexity rules — forcing users to add symbols produces weaker passwords
- No mandatory periodic changes — unless there is evidence of compromise
- Check against known breached password lists — block commonly used passwords
- Allow all printable characters including spaces — passphrases are highly recommended

## Password Managers: The Real Solution

The only practical solution to the password problem is a password manager. A good password manager generates a unique, random, long password for every account and stores it in an encrypted vault. You need to remember only one strong master password.

Leading password managers include:
- **Bitwarden** (open source, free tier available)
- **1Password**
- **Dashlane**
- **Apple iCloud Keychain** / **Google Password Manager**

All of these generate strong random passwords, auto-fill credentials on login forms, warn you about reused or compromised passwords, and sync across devices securely.

## Two-Factor Authentication

Even the strongest password can be compromised if a service has a server-side breach or if you are tricked by a phishing attack. Two-factor authentication (2FA) adds a critical second layer of protection.

**TOTP authenticator apps** (like Authy or Google Authenticator) generate time-based one-time codes. These are significantly more secure than SMS-based 2FA, which can be intercepted via SIM swapping attacks.

**Hardware security keys** (like YubiKey) provide the strongest 2FA available. They are phishing-resistant because they verify the domain of the site before responding.

**SMS 2FA** is better than no 2FA but should not be relied upon for high-value accounts.

Enable 2FA on every account that supports it, prioritising email, banking, social media, and any account linked to a payment method.

## Password Requirements for Developers

If you are building an application that handles user authentication, you are responsible for implementing password security correctly:

- **Hash passwords with bcrypt, scrypt, or Argon2** — never MD5 or SHA-256, which are too fast and unsuitable for password hashing. Learn more in our [MD5 vs SHA-256 guide](/blog/md5-sha256-difference).
- **Use a unique salt per password** — good libraries handle this automatically.
- **Implement rate limiting and account lockout** to prevent brute-force attacks.
- **Check against breached password lists** using the HaveIBeenPwned API at registration time.
- **Never store plaintext passwords** or use reversible encryption.

## Passphrases: A Human-Friendly Alternative

A passphrase is a sequence of random words — like "correct-horse-battery-staple" — that is long enough to be secure but easier to remember than a string of random characters. At four random words, a passphrase has roughly 2⁵¹ combinations using a 7776-word wordlist. That is more than sufficient for most purposes.

Passphrases work best as master passwords for password managers, encryption keys, and credentials you must type regularly. For individual website accounts, use a [password generator](/tools/password-generator) with full randomness.

## How to Audit Your Current Passwords

1. Check whether your email addresses have been compromised at **haveibeenpwned.com**.
2. Review your accounts in your password manager — most show a security audit highlighting reused, weak, or compromised passwords.
3. Prioritise changing passwords for: your email account, your bank, your password manager, and social media.

## Frequently Asked Questions

**Q: How long should a strong password be?**
Security experts recommend at least 12–16 characters for standard accounts and 20+ for high-value accounts like email and banking. Our [Password Generator](/tools/password-generator) lets you set any length from 8 to 128 characters.

**Q: Is a random password better than a passphrase?**
Both are excellent when properly generated. A random 16-character password using all character types and a 4-word passphrase from a large wordlist offer comparable security. The passphrase is easier to remember; the random password is shorter.

**Q: Can I use the same strong password on multiple sites?**
No — never reuse passwords regardless of their strength. If one site is breached, credential stuffing attacks will test your password on every other major site automatically.

**Q: Are browser-saved passwords safe?**
Modern browsers like Chrome, Firefox, and Safari encrypt saved passwords and offer breach-detection alerts. They are significantly better than reusing passwords, though a dedicated password manager offers more features and stronger security guarantees.

## Conclusion

Password security is not glamorous, but it is foundational. A strong, unique password for every account — managed by a reputable password manager — with 2FA enabled on critical accounts will protect you against the vast majority of attacks. [Use ToolHub's free Password Generator](/tools/password-generator) to create cryptographically random passwords of any length and complexity — entirely in your browser, with zero data stored.6:T1bf4,Base64 is one of those technologies that developers encounter constantly but rarely stop to understand deeply. You see it in image data URIs, JWT tokens, email attachments, and API authentication headers. This guide explains what Base64 encoding is, how it works, when to use it, and equally important — when not to.

> **Try it instantly:** Use our free [Base64 Encoder & Decoder](/tools/base64) to encode or decode any text or data right in your browser — no signup, no data stored.

## What is Base64?

Base64 is a binary-to-text encoding scheme that converts arbitrary binary data into a string of 64 printable ASCII characters. The 64 characters used are: A–Z (26), a–z (26), 0–9 (10), plus (`+`) and slash (`/`), with equals sign (`=`) used as padding.

Some variants, like Base64URL, replace `+` with `-` and `/` with `_` to make the output safe for use in URLs and JWT tokens.

The name "Base64" simply reflects that the encoding uses a 64-character alphabet — the same way that everyday counting uses base-10 and computers use base-2 (binary).

## Why Does Base64 Exist?

The core problem Base64 solves is this: many communication protocols and systems were designed to handle **text** (specifically 7-bit ASCII), not arbitrary binary data. When you need to transmit binary data — like an image, a PDF, or an encrypted token — through a text-based channel, you need a way to represent that binary data using only printable text characters.

Common scenarios where this arises:

- **Email (MIME encoding)**: Email was originally designed for 7-bit ASCII text. Attachments must be Base64-encoded to travel safely through email servers.
- **HTML data URIs**: Embedding an image directly in HTML requires encoding the binary image data as text.
- **JWT tokens**: The header and payload sections of JSON Web Tokens are Base64URL-encoded.
- **HTTP Basic Authentication**: Credentials are Base64-encoded in the Authorization header.
- **Cryptographic keys and certificates**: PEM format files (like SSL certificates) use Base64 to represent binary key data.

## How Base64 Encoding Works

Base64 takes 3 bytes (24 bits) of input and converts them to 4 Base64 characters (each representing 6 bits). This is the fundamental operation.

For example, the ASCII string "Man" has three bytes: 77, 97, 110. In binary: `01001101 01100001 01101110`. Grouping into 6-bit chunks: `010011 010110 000101 101110`. Converting each 6-bit group to its Base64 character: **T, W, F, u**. So "Man" encodes to **"TWFu"**.

The encoding ratio is always 4/3 — Base64 output is approximately **33% larger** than the input. For a 1 MB image, the Base64 string will be roughly 1.37 MB.

## Base64 Is Encoding, Not Encryption

This is the most important misconception to correct: **Base64 is not encryption and provides zero security.** It is trivially reversible. Anyone who sees a Base64 string can decode it in seconds using any of hundreds of free tools, including our [Base64 decoder](/tools/base64).

If you need to protect data, use proper encryption (AES, RSA, etc.) — not Base64 encoding.

## Common Use Cases in Web Development

**Embedding images in CSS/HTML**: Small icons and UI elements can be embedded directly as data URIs, eliminating an extra HTTP request. The syntax is: `url('data:image/png;base64,<encoded data>')`.

**Transmitting binary data in JSON**: JSON only supports text. If you need to include binary data (like an image or file) in a JSON API payload, Base64 encoding is the standard approach.

**JWT tokens**: A JWT like `eyJhbGciOiJIUzI1NiJ9.eyJ1c2VySWQiOjF9.signature` consists of three Base64URL-encoded sections separated by dots. You can decode the first two sections to see the header and payload.

**SSH and SSL keys**: The familiar "-----BEGIN RSA PRIVATE KEY-----" block contains Base64-encoded binary key data.

**HMAC and cryptographic signatures**: Many API authentication schemes use Base64-encoded HMAC signatures in request headers.

## Base64 in URLs: The URL-Safe Variant

Standard Base64 uses `+` and `/` characters, which have special meanings in URLs. Base64URL is a variant that replaces `+` with `-` and `/` with `_` and omits the `=` padding, making it safe to use in query strings and URL path segments without percent-encoding.

This variant is used in JWTs, OAuth tokens, and many modern API authentication schemes. See our [URL Encoding guide](/blog/url-encoding-explained) for more on safe URL characters.

## Performance Considerations

Base64 encoding and decoding are computationally cheap, but the 33% size overhead matters for performance-sensitive applications. For large binary payloads, consider whether binary transfer protocols (like `multipart/form-data` for file uploads) might be more appropriate than Base64 in JSON.

For embedded images, use Base64 data URIs only for small images (under 10–15 KB). Larger images are better served as separate files with proper HTTP caching headers.

## Decoding Base64: What You Can Learn

Decoding a Base64 string reveals the underlying data — useful for debugging. You can:
- Decode JWT payloads to inspect claims
- Decode Base64-encoded configuration values
- Check what an API is actually sending in an encoded response field

Our [Base64 Encoder/Decoder](/tools/base64) works entirely in your browser — paste any text to encode it, or paste any Base64 string to decode it instantly.

## Base64 Variants at a Glance

| Variant | Characters | Padding | Use Case |
|---------|-----------|---------|----------|
| Standard | +, / | = | Email, general |
| Base64URL | -, _ | None | JWTs, OAuth, URLs |
| MIME | +, / | =, line breaks | Email attachments |

Always check which variant an API or protocol expects before implementing Base64 handling.

## Frequently Asked Questions

**Q: What is the difference between Base64 encoding and encryption?**
Base64 is encoding — it transforms data into a different format that is easily reversible. Encryption is a security measure — it scrambles data in a way that requires a key to reverse. Never use Base64 to "hide" sensitive data.

**Q: Why are JWT tokens Base64-encoded?**
JWTs need to be URL-safe and easy to transmit in HTTP headers. Base64URL encoding achieves this. The security of a JWT comes from its cryptographic signature, not from the encoding. You can decode a JWT's payload using our [Base64 decoder](/tools/base64).

**Q: How do I encode a file to Base64 in JavaScript?**
Use `FileReader` with `readAsDataURL()` for browser environments, or `Buffer.from(data).toString('base64')` in Node.js.

**Q: Does Base64 increase file size?**
Yes — by approximately 33%. A 100KB binary file becomes roughly 133KB when Base64-encoded. This is a trade-off you accept when you need to transmit binary data through text-based protocols.

## Conclusion

Base64 is a fundamental encoding used throughout web development, networking, and cryptography. Understanding what it is (a binary-to-text encoding), what it is not (encryption), and when to use it will make you a more confident developer. [Bookmark ToolHub's Base64 tool](/tools/base64) for instant encoding and decoding whenever you need it.7:T1ba7,Every time you click a link, submit a form, or make an API request, URL encoding is working silently in the background. When you search for "cafe near me," the space and any accented characters get converted into percent-encoded sequences before the URL is sent to the server. Understanding URL encoding is essential for web developers, API designers, and anyone who works with web addresses.

> **Quick tool:** Instantly encode or decode any URL with our free [URL Encoder & Decoder](/tools/url-encoder) — no signup required.

## What is URL Encoding?

URL encoding (officially called "percent-encoding") is a mechanism for encoding information in a Uniform Resource Identifier (URI) in a way that is unambiguous and safe to transmit. URLs can only contain a limited set of safe characters — alphanumeric characters and a few symbols (`-`, `_`, `.`, `~`). Any other character must be encoded.

Encoding works by replacing the character with a percent sign (`%`) followed by two hexadecimal digits representing the character's ASCII or UTF-8 byte value. For example:

- Space → `%20`
- `@` → `%40`
- `/` → `%2F`
- The accented é in "café" → `%C3%A9` (two bytes in UTF-8)
- `&` → `%26`

## Which Characters Need to Be Encoded?

The URI specification divides characters into three groups:

**Reserved characters**: These have special syntactic meaning in URLs and must be encoded when they appear as data rather than structure. Examples include colon, slash, question mark, hash, brackets, at sign, and ampersand.

**Unreserved characters**: These are safe in any context and do not need encoding: A–Z, a–z, 0–9, hyphen, underscore, period, and tilde.

**Other characters**: Everything else — spaces, accented characters, non-Latin scripts, control characters — must be percent-encoded.

## URL Encoding vs. Query String Encoding

There is a subtle but important difference between general percent-encoding and `application/x-www-form-urlencoded` encoding (the format used by HTML form submissions).

- In **standard percent-encoding**, spaces become `%20`.
- In **form-urlencoded** encoding (used in HTML forms), spaces are encoded as `+`.

The `encodeURIComponent()` function in JavaScript uses `%20`, while form submissions use `+`. This is a common source of bugs. When manually constructing query strings, always use `encodeURIComponent()` rather than `encodeURI()`.

## JavaScript URL Encoding Functions

JavaScript provides three relevant functions:

**`encodeURIComponent(value)`** — encodes a value to be safely embedded in a URL component (query param value, path segment). Use this 90% of the time.

**`encodeURI(uri)`** — encodes a complete URL but leaves structural characters unencoded.

**`decodeURIComponent(encoded)`** — decodes a percent-encoded string back to its original form.

```javascript
const query = 'cafe latte & pastry'
const encoded = encodeURIComponent(query)
// Result: 'cafe%20latte%20%26%20pastry'
const url = 'https://example.com/search?q=' + encoded
```

## Common URL Encoding Pitfalls

**Double encoding**: If you call `encodeURIComponent` on an already-encoded string, you encode the percent signs too — `%20` becomes `%2520`. Always decode before re-encoding.

**Inconsistent space handling**: Some systems expect `+` for spaces in query strings, others expect `%20`. Know which your API uses. Our [URL Encoder](/tools/url-encoder) lets you choose.

**Non-ASCII characters**: URLs technically only support ASCII, but internationalized URLs use UTF-8 percent-encoding for paths and queries.

**Forgetting to encode path parameters**: Path parameters that contain slash, question mark, or hash characters must be encoded, or they will be interpreted as URL structure rather than data.

## URL Encoding in APIs

When building or consuming REST APIs, URL encoding is critical for query parameters. HTTP libraries like Axios, fetch, and HTTPie handle encoding automatically if you pass parameters as objects:

```javascript
// Let the library handle encoding — recommended approach
const response = await fetch('/api/search?' + new URLSearchParams({
  q: 'C++ programming',
  sort: 'price:asc'
}))
// Produces: /api/search?q=C%2B%2B+programming&sort=price%3Aasc
```

This is the recommended approach as it eliminates encoding errors. For more complex data that needs to be transmitted, consider [JSON formatting](/tools/json-formatter) as an alternative to URL encoding.

## Decoding URLs for Debugging

When debugging URL issues — perhaps an API request is failing or a redirect is going wrong — quickly decoding percent-encoded URLs is invaluable. A URL like `https://example.com/search?q=caf%C3%A9%20latte` is much clearer when decoded.

[ToolHub's URL Encoder/Decoder](/tools/url-encoder) lets you instantly encode or decode any URL or component, helping you debug issues and understand what URLs actually contain.

## Internationalised URLs (IRI)

Internationalized Resource Identifiers (IRIs) extend URIs to allow Unicode characters directly in paths and queries, making URLs human-readable in non-Latin scripts. Browsers display IRIs in decoded form in the address bar, while the actual network request uses percent-encoded UTF-8 bytes.

If you are generating URL slugs for multilingual content, our [Slug Generator](/tools/slug-generator) creates clean, URL-safe slugs from any language.

## Frequently Asked Questions

**Q: What is the difference between `encodeURI` and `encodeURIComponent`?**
`encodeURI` encodes an entire URL and leaves structural characters (like `?&=`) intact. `encodeURIComponent` encodes a single URL component value — it encodes those structural characters too. Always use `encodeURIComponent` for parameter values.

**Q: Why does a space sometimes appear as `+` and sometimes as `%20` in URLs?**
It depends on the encoding context. HTML form submissions use `application/x-www-form-urlencoded`, which converts spaces to `+`. Standard percent-encoding (used in paths and modern query building) uses `%20`. Our [URL Encoder](/tools/url-encoder) lets you choose which output format you need.

**Q: How do I decode a URL in Python?**
Use `urllib.parse.unquote(url)` for `%xx` sequences, or `urllib.parse.unquote_plus(url)` if `+` signs should also be decoded as spaces.

**Q: Do I need to encode URLs in anchor tags (`<a href>`)?**
Modern browsers handle many characters automatically in `href` attributes, but best practice is to always use properly encoded URLs. Generate clean slugs with our [Slug Generator](/tools/slug-generator) and avoid special characters in path segments.

## Conclusion

URL encoding is a foundational web technology that prevents ambiguity and ensures data is transmitted safely through URLs. Understanding the difference between structural URL characters and data characters, using `encodeURIComponent` correctly in JavaScript, and knowing about the `+` versus `%20` space encoding difference will save you significant debugging time. [Use ToolHub's URL Encoder](/tools/url-encoder) whenever you need to quickly encode or decode URL components.8:T1c1f,Meta tags are HTML elements that provide information about a web page to search engines, browsers, and social media platforms. Although they are invisible to users, they have an enormous impact on how pages appear in search results, how they look when shared on social media, and how browsers handle them. This guide covers every important meta tag you need to know.

> **Quick start:** Use our free [Meta Tag Generator](/tools/meta-tag-generator) to create a complete, optimised set of meta tags for any page in seconds.

## What Are Meta Tags?

Meta tags live inside the `<head>` section of an HTML document. They are not displayed on the page itself but are read by search engine crawlers, social media scrapers, and browser rendering engines. A minimal set of meta tags looks like this:

```html
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Page Title — Site Name</title>
  <meta name="description" content="A concise description of the page.">
</head>
```

## The Title Tag

While technically not a meta element, the title tag is the **most important on-page SEO element**. It appears as the clickable headline in search engine results pages and as the browser tab label.

Best practices for title tags:
- Keep them between 50–60 characters (Google truncates around 600px width, roughly 60 characters)
- Include your primary keyword near the beginning
- Make each page's title unique
- Use a separator (like a dash or pipe) between the page title and site name
- Write for humans first, then for search engines

Example: `JSON Formatter — Free Online Tool | ToolHub`

## The Description Meta Tag

The meta description is a brief summary of the page shown below the title in search results. While Google does not use it as a direct ranking factor, it significantly impacts **click-through rates**.

Best practices:
- Keep descriptions between 150–160 characters
- Include your target keyword naturally
- Write a genuine, compelling summary — treat it as ad copy
- Make each page's description unique
- Include a call to action where natural

## Robots Meta Tag

The robots meta tag tells search engine crawlers how to treat a page. Common values:
- `index, follow` — Default, allow indexing and link following
- `noindex, nofollow` — Block the page entirely from search results
- `noindex, follow` — Do not index but still follow links

Use `noindex` for: duplicate content pages, search result pages, thank-you pages, internal tools, and staging environments.

## Viewport Meta Tag (Mobile Responsiveness)

The viewport meta tag controls how a page is displayed on mobile devices. Without it, mobile browsers render the page at desktop width and scale it down, making text tiny.

```html
<meta name="viewport" content="width=device-width, initial-scale=1.0">
```

This is non-negotiable for modern websites. Google uses mobile-first indexing, meaning it evaluates the mobile version of your page for ranking.

## Charset Meta Tag

Always use UTF-8, which supports all languages and symbols:

```html
<meta charset="UTF-8">
```

Place this as the very first element inside `<head>` — before the title tag — to ensure the browser uses the correct encoding when parsing the page title.

## Open Graph Tags for Social Sharing

Open Graph (OG) tags were introduced by Facebook and are now used by all major social platforms to generate link preview cards when pages are shared. Without OG tags, platforms make a poor guess at what image and text to show.

```html
<meta property="og:title" content="Page Title">
<meta property="og:description" content="Page description for social sharing.">
<meta property="og:image" content="https://example.com/og-image.jpg">
<meta property="og:url" content="https://example.com/page">
<meta property="og:type" content="website">
<meta property="og:site_name" content="Your Site Name">
```

OG image requirements: Use an image at least 1200×630 pixels. Learn more in our [Open Graph implementation guide](/blog/open-graph-guide).

## Twitter Card Tags

Twitter has its own set of meta tags for customising how links appear on X/Twitter:

```html
<meta name="twitter:card" content="summary_large_image">
<meta name="twitter:title" content="Page Title">
<meta name="twitter:description" content="Description for Twitter sharing.">
<meta name="twitter:image" content="https://example.com/twitter-image.jpg">
<meta name="twitter:site" content="@yourtwitterhandle">
```

Use `summary_large_image` for most pages (shows a large image preview).

## Canonical Tag (Preventing Duplicate Content)

The canonical tag tells search engines which version of a page is the "official" version when multiple URLs serve similar content:

```html
<link rel="canonical" href="https://example.com/the-definitive-url/">
```

Use canonical tags for: HTTP vs HTTPS, www vs non-www, URLs with tracking parameters, and paginated pages.

## Schema Markup (Structured Data)

Schema.org structured data in JSON-LD format helps search engines understand your content and can unlock rich results — star ratings, FAQ dropdowns, event dates appearing directly in search results:

```html
<script type="application/ld+json">
{
  "@context": "https://schema.org",
  "@type": "Tool",
  "name": "JSON Formatter",
  "description": "Free online JSON formatter and validator",
  "url": "https://example.com/tools/json-formatter"
}
</script>
```

## Auditing Your Meta Tags

Use browser developer tools to inspect a page's meta tags. Google Search Console shows how your pages appear in search results and highlights missing or duplicate title and description issues. Generate all your meta tags at once using our [Meta Tag Generator](/tools/meta-tag-generator) to ensure nothing is missing.

## Frequently Asked Questions

**Q: Do meta keywords still matter for SEO?**
No. Google has officially ignored the `<meta name="keywords">` tag since 2009. Focus instead on well-written title tags, descriptions, and quality content.

**Q: How often should I update my meta descriptions?**
Update them whenever you have better data about what drives clicks. Review your Google Search Console data to see which descriptions have low click-through rates and test improvements.

**Q: What is the ideal meta description length?**
Between 150–160 characters for desktop; Google may show shorter versions on mobile (around 120 characters). Our [Meta Tag Generator](/tools/meta-tag-generator) shows a live character count as you type.

**Q: Do Open Graph tags help with Google SEO?**
OG tags do not directly influence Google rankings, but they dramatically improve click-through rates when your content is shared on social media — which drives more referral traffic and indirectly improves SEO metrics.

## Conclusion

Meta tags are one of the highest-leverage technical SEO investments you can make. A well-crafted title tag and description improve click-through rates. Proper OG and Twitter Card tags ensure your content looks great when shared. Canonical tags prevent duplicate content penalties. [Use ToolHub's Meta Tag Generator](/tools/meta-tag-generator) to create a complete set of meta tags for any page instantly.0:["B7BEY9Ai0mHqLWmihG-D-",[[["",{"children":["__PAGE__",{}]},"$undefined","$undefined",true],["",{"children":["__PAGE__",{},[["$L1",["$","$L2",null,{"tools":[{"id":"json-formatter","name":"JSON Formatter","shortDesc":"Format, validate and minify JSON instantly","longDesc":"Paste any JSON string to instantly format it with proper indentation, or minify it for production. Validates syntax and highlights errors with line numbers.","category":"developer","icon":"{ }","keywords":["json","format","validate","pretty print","minify","beautify","lint"]},{"id":"base64","name":"Base64 Encoder / Decoder","shortDesc":"Encode or decode Base64 strings in your browser","longDesc":"Instantly encode plain text to Base64 or decode Base64 back to readable text. Also supports URL-safe Base64. Everything runs in your browser — no data is sent to any server.","category":"developer","icon":"64","keywords":["base64","encode","decode","binary","text"]},{"id":"uuid-generator","name":"UUID Generator","shortDesc":"Generate v4 UUIDs instantly — bulk or single","longDesc":"Generate one or hundreds of RFC 4122 version 4 UUIDs in one click. Copy individually or all at once. Uses the browser's cryptographically secure random number generator.","category":"developer","icon":"🔑","keywords":["uuid","guid","unique id","random","v4"]},{"id":"jwt-decoder","name":"JWT Decoder","shortDesc":"Decode and inspect JWT tokens instantly","longDesc":"Paste any JSON Web Token to instantly decode its header, payload and signature sections. Highlights expiry status and algorithm. No token is ever sent to a server.","category":"developer","icon":"🔓","keywords":["jwt","json web token","decode","auth","bearer"]},{"id":"url-encoder","name":"URL Encoder / Decoder","shortDesc":"Encode or decode URLs and query strings","longDesc":"Percent-encode special characters in URLs or decode encoded URLs back to readable form. Handles full URLs and individual query string values.","category":"developer","icon":"🔗","keywords":["url","encode","decode","percent encoding","query string","uri"]},{"id":"csv-json","name":"CSV ↔ JSON Converter","shortDesc":"Convert between CSV and JSON formats in one click","longDesc":"Paste CSV data to get clean JSON, or paste a JSON array to get a downloadable CSV. Automatically detects headers and handles quoted fields.","category":"developer","icon":"⇄","keywords":["csv","json","convert","data","spreadsheet","import","export"]},{"id":"sql-formatter","name":"SQL Formatter","shortDesc":"Format and beautify SQL queries instantly","longDesc":"Paste any SQL query to get it beautifully indented and formatted with consistent capitalisation of keywords. Supports SELECT, INSERT, UPDATE, DELETE and more.","category":"developer","icon":"🗄️","keywords":["sql","format","query","database","mysql","postgres","beautify"]},{"id":"word-counter","name":"Word Counter","shortDesc":"Count words, characters and reading time","longDesc":"Instantly count words, characters (with and without spaces), sentences, paragraphs, and estimated reading time. Perfect for blog posts, essays, and social media copy.","category":"text","icon":"🔢","keywords":["word count","character count","reading time","text length","essay"]},{"id":"case-converter","name":"Case Converter","shortDesc":"Convert text between UPPER, lower, Title and more","longDesc":"Convert any text to uppercase, lowercase, Title Case, Sentence case, camelCase, snake_case, kebab-case, or PascalCase. Instant, no page reload.","category":"text","icon":"Aa","keywords":["case","uppercase","lowercase","title case","camelcase","snake_case","kebab"]},{"id":"remove-spaces","name":"Remove Extra Spaces","shortDesc":"Clean up extra whitespace from any text","longDesc":"Remove duplicate spaces, trim leading and trailing whitespace, remove blank lines, and normalise all spacing in one click. Great for cleaning up pasted text.","category":"text","icon":"⎵","keywords":["spaces","whitespace","trim","clean","remove","extra spaces"]},{"id":"text-diff","name":"Text Diff Checker","shortDesc":"Compare two texts and highlight differences","longDesc":"Paste two pieces of text side by side and instantly see what changed — additions highlighted in green, deletions in red. Great for proofreading and code reviews.","category":"text","icon":"⟺","keywords":["diff","compare","difference","text compare","changes"]},{"id":"regex-tester","name":"Regex Tester","shortDesc":"Test regular expressions with live highlighting","longDesc":"Write a regex pattern and test it against any string in real time. All matches are highlighted. Supports flags (global, case-insensitive, multiline) and shows captured groups.","category":"text","icon":"/.*/","keywords":["regex","regular expression","pattern","match","test"]},{"id":"meta-tag-generator","name":"Meta Tag Generator","shortDesc":"Generate complete SEO and Open Graph meta tags","longDesc":"Fill in your page details and get a complete set of meta tags including title, description, Open Graph, Twitter Card and robots directives. Copy-paste ready HTML.","category":"seo","icon":"</>","keywords":["meta tags","seo","open graph","twitter card","robots","head"]},{"id":"slug-generator","name":"Slug Generator","shortDesc":"Generate SEO-friendly URL slugs from any title","longDesc":"Convert any title or phrase into a clean, SEO-friendly URL slug. Removes special characters, replaces spaces with hyphens, and handles accented characters.","category":"seo","icon":"🔗","keywords":["slug","url","seo","permalink","friendly url"]},{"id":"keyword-density","name":"Keyword Density Checker","shortDesc":"Analyse keyword frequency in your content","longDesc":"Paste any article or page content to see the frequency and density percentage of every word and phrase. Helps identify over-optimisation and keyword gaps.","category":"seo","icon":"📊","keywords":["keyword","density","seo","content","frequency","analysis"]},{"id":"og-generator","name":"Open Graph Generator","shortDesc":"Create Open Graph tags for social sharing","longDesc":"Generate complete Open Graph meta tags for Facebook, LinkedIn, and other platforms. Preview how your link will appear in a social media feed before publishing.","category":"seo","icon":"📤","keywords":["open graph","og tags","social","facebook","linkedin","preview"]},{"id":"robots-txt","name":"Robots.txt Generator","shortDesc":"Generate a robots.txt file for your website","longDesc":"Configure allow/disallow rules for search engine bots, specify your sitemap URL, and download a robots.txt file ready to place at your site root.","category":"seo","icon":"🤖","keywords":["robots.txt","seo","crawlers","sitemap","googlebot"]},{"id":"password-generator","name":"Password Generator","shortDesc":"Generate strong, random passwords instantly","longDesc":"Generate cryptographically secure random passwords with full control over length, uppercase, lowercase, numbers, and symbols. Shows password strength score.","category":"security","icon":"🔐","keywords":["password","generator","random","security","strong","secure"]},{"id":"hash-generator","name":"Hash Generator","shortDesc":"Generate MD5, SHA-256 and SHA-512 hashes","longDesc":"Compute cryptographic hashes of any text using MD5, SHA-1, SHA-256, or SHA-512. Useful for verifying data integrity and understanding hash functions.","category":"security","icon":"#","keywords":["hash","md5","sha256","sha512","checksum","crypto"]},{"id":"hex-color","name":"Hex Colour Picker","shortDesc":"Pick, convert and explore colours in HEX, RGB & HSL","longDesc":"Convert colours between HEX, RGB, HSL, and HSB formats instantly. Pick from a colour wheel, generate complementary palettes, and copy CSS values in one click.","category":"design","icon":"🎨","keywords":["color","colour","hex","rgb","hsl","picker","palette"]},{"id":"css-gradient","name":"CSS Gradient Generator","shortDesc":"Build beautiful CSS gradients visually","longDesc":"Create linear and radial CSS gradients with a live visual editor. Add multiple colour stops, adjust angles and positions, and copy the CSS code instantly.","category":"design","icon":"🌈","keywords":["css","gradient","design","background","linear","radial"]}],"categories":[{"id":"developer","name":"Developer Tools","icon":"⚙️","color":"teal","desc":"JSON, Base64, UUID, JWT and more developer utilities"},{"id":"text","name":"Text Tools","icon":"📝","color":"blue","desc":"Word counter, case converter, diff checker and more"},{"id":"seo","name":"SEO Tools","icon":"🔍","color":"green","desc":"Meta tags, slug generator, keyword density checker"},{"id":"security","name":"Security Tools","icon":"🔒","color":"coral","desc":"Password generator, hash generator, JWT decoder"},{"id":"design","name":"Design Tools","icon":"🎨","color":"purple","desc":"Colour picker, CSS gradient generator and more"}],"blogs":[{"id":"what-is-json-formatter","title":"What is a JSON Formatter? Complete Guide for Developers (2024)","description":"Learn what JSON is, why formatting matters, and how a free online JSON formatter boosts developer productivity — with examples, tips, and FAQs.","relatedTool":"json-formatter","category":"Developer","color":"teal","readTime":7,"publishDate":"2024-11-01","tags":["json","developer","formatting","api"],"relatedBlogs":["how-to-format-json","what-is-base64","csv-json-conversion"],"content":"$3"},{"id":"how-to-format-json","title":"How to Format JSON: Best Practices for Clean, Readable Data (2024)","description":"A complete guide to JSON formatting best practices — indentation, naming conventions, schema validation, and tools to keep your JSON clean across a team.","relatedTool":"json-formatter","category":"Developer","color":"teal","readTime":7,"publishDate":"2024-11-05","tags":["json","best practices","formatting","developer"],"relatedBlogs":["what-is-json-formatter","csv-json-conversion","jwt-explained"],"content":"$4"},{"id":"password-security-guide","title":"The Complete Guide to Password Security in 2024: How to Stay Safe Online","description":"Everything you need to know about creating strong passwords, using password managers, and protecting your accounts — with a free password generator.","relatedTool":"password-generator","category":"Security","color":"coral","readTime":8,"publishDate":"2024-11-08","tags":["password","security","cybersecurity","online safety"],"relatedBlogs":["md5-sha256-difference","what-is-uuid","jwt-explained"],"content":"$5"},{"id":"what-is-base64","title":"What is Base64 Encoding? A Plain-English Explanation for Developers","description":"Understand Base64 encoding and decoding — what it is, why it exists, common use cases in web development, and when NOT to use it.","relatedTool":"base64-encoder","category":"Developer","color":"emerald","readTime":7,"publishDate":"2024-11-12","tags":["base64","encoding","developer","web"],"relatedBlogs":["what-is-json-formatter","url-encoding-explained","jwt-explained"],"content":"$6"},{"id":"url-encoding-explained","title":"URL Encoding Explained: What It Is and Why It Matters for Developers","description":"A clear explanation of percent-encoding — what gets encoded, how to decode URLs, common pitfalls in web development, and how to fix them.","relatedTool":"url-encoder","category":"Developer","color":"amber","readTime":7,"publishDate":"2024-11-15","tags":["url","encoding","web","developer"],"relatedBlogs":["what-is-base64","what-is-json-formatter","slug-generator-guide"],"content":"$7"},{"id":"meta-tags-complete-guide","title":"Meta Tags Complete Guide: SEO, Social Sharing & Best Practices (2024)","description":"Everything web developers and SEO professionals need to know about HTML meta tags — title tags, descriptions, Open Graph, Twitter Cards, and more.","relatedTool":"meta-tag-generator","category":"SEO","color":"pink","readTime":9,"publishDate":"2024-11-18","tags":["meta tags","seo","html","open graph"],"relatedBlogs":["open-graph-guide","robots-txt-guide","keyword-density-seo"],"content":"$8"}]}]],null],null]},[["$","html",null,{"lang":"en","children":[["$","head",null,{"children":[["$","meta",null,{"name":"google-site-verification","content":"w3SWTovaVL930ay54XX_q8tDdqsQV5uHr_MHaOKGJkA"}],["$","$L9",null,{"id":"org-schema","type":"application/ld+json","strategy":"afterInteractive","dangerouslySetInnerHTML":{"__html":"{\"@context\":\"https://schema.org\",\"@type\":\"Organization\",\"name\":\"ToolFocus\",\"alternateName\":\"Breakout Trade\",\"url\":\"https://toolfocus.in\",\"logo\":\"https://toolfocus.in/icon.png\",\"contactPoint\":{\"@type\":\"ContactPoint\",\"email\":\"breakouttradeapp@gmail.com\",\"contactType\":\"customer support\",\"availableLanguage\":\"English\"},\"sameAs\":[]}"}}],["$","$L9",null,{"id":"website-schema","type":"application/ld+json","strategy":"afterInteractive","dangerouslySetInnerHTML":{"__html":"{\"@context\":\"https://schema.org\",\"@type\":\"WebSite\",\"name\":\"ToolFocus\",\"url\":\"https://toolfocus.in\",\"description\":\"Free browser-based tools for developers, writers, and SEO professionals.\",\"potentialAction\":{\"@type\":\"SearchAction\",\"target\":\"https://toolfocus.in/?q={search_term_string}\",\"query-input\":\"required name=search_term_string\"}}"}}],["$","link",null,{"rel":"ai-content-policy","href":"https://toolfocus.in/llms.txt"}]]}],["$","body",null,{"className":"flex flex-col min-h-screen","children":[["$","a",null,{"href":"#main-content","className":"sr-only focus:not-sr-only focus:absolute focus:top-2 focus:left-2 focus:z-[9999] focus:bg-green-600 focus:text-white focus:px-4 focus:py-2 focus:rounded-lg focus:text-sm focus:font-semibold","children":"Skip to main content"}],["$","$La",null,{}],["$","main",null,{"id":"main-content","className":"flex-1","children":["$","$Lb",null,{"parallelRouterKey":"children","segmentPath":["children"],"error":"$undefined","errorStyles":"$undefined","errorScripts":"$undefined","template":["$","$Lc",null,{}],"templateStyles":"$undefined","templateScripts":"$undefined","notFound":["$","main",null,{"className":"max-w-2xl mx-auto px-4 sm:px-6 py-24 text-center","children":[["$","div",null,{"className":"text-6xl mb-6","children":"🔧"}],["$","h1",null,{"className":"text-3xl font-bold text-gray-900 mb-3","children":"Page not found"}],["$","p",null,{"className":"text-gray-500 text-sm mb-8","children":"The page you're looking for doesn't exist or may have moved. Try one of our popular tools below."}],["$","div",null,{"className":"grid grid-cols-2 gap-3 mb-8 max-w-sm mx-auto","children":[["$","$Ld","json-formatter",{"href":"/tools/json-formatter","className":"p-3 bg-white border border-gray-100 rounded-xl hover:border-green-200 hover:shadow-sm transition-all text-left group","children":[["$","p",null,{"className":"text-xs font-semibold text-gray-700 group-hover:text-green-700 transition-colors","children":"JSON Formatter"}],["$","p",null,{"className":"text-[10px] text-gray-400 mt-0.5 line-clamp-1","children":"Format, validate and minify JSON instantly"}]]}],["$","$Ld","base64",{"href":"/tools/base64","className":"p-3 bg-white border border-gray-100 rounded-xl hover:border-green-200 hover:shadow-sm transition-all text-left group","children":[["$","p",null,{"className":"text-xs font-semibold text-gray-700 group-hover:text-green-700 transition-colors","children":"Base64 Encoder / Decoder"}],["$","p",null,{"className":"text-[10px] text-gray-400 mt-0.5 line-clamp-1","children":"Encode or decode Base64 strings in your browser"}]]}],["$","$Ld","uuid-generator",{"href":"/tools/uuid-generator","className":"p-3 bg-white border border-gray-100 rounded-xl hover:border-green-200 hover:shadow-sm transition-all text-left group","children":[["$","p",null,{"className":"text-xs font-semibold text-gray-700 group-hover:text-green-700 transition-colors","children":"UUID Generator"}],["$","p",null,{"className":"text-[10px] text-gray-400 mt-0.5 line-clamp-1","children":"Generate v4 UUIDs instantly — bulk or single"}]]}],["$","$Ld","jwt-decoder",{"href":"/tools/jwt-decoder","className":"p-3 bg-white border border-gray-100 rounded-xl hover:border-green-200 hover:shadow-sm transition-all text-left group","children":[["$","p",null,{"className":"text-xs font-semibold text-gray-700 group-hover:text-green-700 transition-colors","children":"JWT Decoder"}],["$","p",null,{"className":"text-[10px] text-gray-400 mt-0.5 line-clamp-1","children":"Decode and inspect JWT tokens instantly"}]]}]]}],["$","div",null,{"className":"flex items-center justify-center gap-4","children":[["$","$Ld",null,{"href":"/","className":"px-5 py-2 bg-green-600 hover:bg-green-700 text-white text-sm font-semibold rounded-lg transition-colors","children":"← Back to home"}],["$","$Ld",null,{"href":"/contact","className":"text-sm text-gray-500 hover:text-green-600 transition-colors underline","children":"Report broken link"}]]}]]}],"notFoundStyles":[],"styles":null}]}],["$","footer",null,{"className":"border-t border-gray-100 bg-gray-50 mt-12","children":["$","div",null,{"className":"max-w-7xl mx-auto px-4 sm:px-6 py-10","children":[["$","div",null,{"className":"grid grid-cols-2 sm:grid-cols-4 gap-8 mb-8","children":[["$","div",null,{"className":"col-span-2 sm:col-span-1","children":[["$","$Ld",null,{"href":"/","className":"flex items-center gap-1.5 mb-3","children":[["$","span",null,{"className":"w-6 h-6 rounded-lg flex items-center justify-center text-xs font-black text-white","style":{"background":"linear-gradient(135deg,#16a34a,#059669)"},"children":"⚡"}],["$","span",null,{"className":"font-bold text-gray-900 text-sm","children":["Tool",["$","span",null,{"className":"text-green-600","children":"Hub"}]]}]]}],["$","p",null,{"className":"text-xs text-gray-500 leading-relaxed","children":"Free browser-based tools for developers, writers, and SEO professionals. No signup, no tracking, no cost."}],["$","p",null,{"className":"mt-2 text-xs text-gray-400","children":["Owned by ",["$","strong",null,{"className":"text-gray-500","children":"Breakout Trade"}]]}]]}],["$","div",null,{"children":[["$","p",null,{"className":"text-xs font-semibold text-gray-700 uppercase tracking-wider mb-3","children":"Tools"}],["$","ul",null,{"className":"space-y-2","children":[["$","li","developer",{"children":["$","$Ld",null,{"href":"/tools/category/developer","className":"text-xs text-gray-500 hover:text-green-700 transition-colors","children":["⚙️"," ","Developer Tools"]}]}],["$","li","text",{"children":["$","$Ld",null,{"href":"/tools/category/text","className":"text-xs text-gray-500 hover:text-green-700 transition-colors","children":["📝"," ","Text Tools"]}]}],["$","li","seo",{"children":["$","$Ld",null,{"href":"/tools/category/seo","className":"text-xs text-gray-500 hover:text-green-700 transition-colors","children":["🔍"," ","SEO Tools"]}]}],["$","li","security",{"children":["$","$Ld",null,{"href":"/tools/category/security","className":"text-xs text-gray-500 hover:text-green-700 transition-colors","children":["🔒"," ","Security Tools"]}]}],["$","li","design",{"children":["$","$Ld",null,{"href":"/tools/category/design","className":"text-xs text-gray-500 hover:text-green-700 transition-colors","children":["🎨"," ","Design Tools"]}]}]]}]]}],["$","div",null,{"children":[["$","p",null,{"className":"text-xs font-semibold text-gray-700 uppercase tracking-wider mb-3","children":"Resources"}],["$","ul",null,{"className":"space-y-2","children":[["$","li",null,{"children":["$","$Ld",null,{"href":"/blog","className":"text-xs text-gray-500 hover:text-green-700 transition-colors","children":"Blog & Guides"}]}],["$","li",null,{"children":["$","$Ld",null,{"href":"/about","className":"text-xs text-gray-500 hover:text-green-700 transition-colors","children":"About ToolFocus"}]}],["$","li",null,{"children":["$","$Ld",null,{"href":"/contact","className":"text-xs text-gray-500 hover:text-green-700 transition-colors","children":"Contact Us"}]}]]}]]}],["$","div",null,{"children":[["$","p",null,{"className":"text-xs font-semibold text-gray-700 uppercase tracking-wider mb-3","children":"Legal"}],["$","ul",null,{"className":"space-y-2","children":[["$","li",null,{"children":["$","$Ld",null,{"href":"/privacy","className":"text-xs text-gray-500 hover:text-green-700 transition-colors","children":"Privacy Policy"}]}],["$","li",null,{"children":["$","$Ld",null,{"href":"/terms","className":"text-xs text-gray-500 hover:text-green-700 transition-colors","children":"Terms of Service"}]}]]}],["$","div",null,{"className":"mt-4 flex flex-col gap-1.5","children":[["$","span",null,{"className":"inline-flex items-center gap-1 text-xs text-gray-400","children":[["$","span",null,{"className":"text-green-500","children":"✓"}]," 100% client-side processing"]}],["$","span",null,{"className":"inline-flex items-center gap-1 text-xs text-gray-400","children":[["$","span",null,{"className":"text-green-500","children":"✓"}]," No data stored on servers"]}],["$","span",null,{"className":"inline-flex items-center gap-1 text-xs text-gray-400","children":[["$","span",null,{"className":"text-green-500","children":"✓"}]," HTTPS encrypted"]}]]}]]}]]}],["$","div",null,{"className":"border-t border-gray-200 pt-6 flex flex-col sm:flex-row items-center justify-between gap-3","children":[["$","p",null,{"className":"text-xs text-gray-400","children":["© ",2026," ToolFocus by ",["$","strong",null,{"children":"Breakout Trade"}],". All rights reserved."]}],["$","p",null,{"className":"text-xs text-gray-400","children":"All tools run entirely in your browser. Your data never leaves your device."}]]}]]}]}],["$","$Le",null,{}]]}]]}],null],null],[[["$","link","0",{"rel":"stylesheet","href":"/_next/static/css/05eee9b94ecb25d2.css","precedence":"next","crossOrigin":"$undefined"}]],"$Lf"]]]]
f:[["$","meta","0",{"name":"viewport","content":"width=device-width, initial-scale=1"}],["$","meta","1",{"charSet":"utf-8"}],["$","title","2",{"children":"ToolFocus — Free Developer & Productivity Tools"}],["$","meta","3",{"name":"description","content":"Free browser-based tools for developers, writers & SEO pros. JSON formatter, password generator, word counter, Base64 encoder, and 20+ more. No signup required."}],["$","link","4",{"rel":"author","href":"https://toolfocus.in/about"}],["$","meta","5",{"name":"author","content":"Breakout Trade"}],["$","meta","6",{"name":"keywords","content":"free online tools,developer tools,json formatter,password generator,word counter,seo tools"}],["$","meta","7",{"name":"creator","content":"Breakout Trade"}],["$","meta","8",{"name":"publisher","content":"Breakout Trade"}],["$","meta","9",{"name":"robots","content":"index, follow"}],["$","meta","10",{"name":"googlebot","content":"index, follow"}],["$","link","11",{"rel":"canonical","href":"https://toolfocus.app"}],["$","meta","12",{"name":"google-site-verification","content":"w3SWTovaVL930ay54XX_q8tDdqsQV5uHr_MHaOKGJkA"}],["$","meta","13",{"property":"og:title","content":"ToolFocus — Free Developer & Productivity Tools"}],["$","meta","14",{"property":"og:description","content":"Free browser-based tools for developers, writers & SEO pros. JSON formatter, password generator, word counter, Base64 encoder, and 20+ more. No signup required."}],["$","meta","15",{"property":"og:url","content":"https://toolfocus.app"}],["$","meta","16",{"property":"og:image","content":"https://toolfocus.app/og-image.png"}],["$","meta","17",{"property":"og:image:width","content":"1200"}],["$","meta","18",{"property":"og:image:height","content":"630"}],["$","meta","19",{"property":"og:image:alt","content":"ToolFocus — Free Developer & Productivity Tools"}],["$","meta","20",{"name":"twitter:card","content":"summary_large_image"}],["$","meta","21",{"name":"twitter:title","content":"ToolFocus — Free Developer & Productivity Tools"}],["$","meta","22",{"name":"twitter:description","content":"Free browser-based tools for developers, writers & SEO pros. No signup required."}],["$","meta","23",{"name":"twitter:image","content":"https://toolfocus.in/og-image.png"}],["$","link","24",{"rel":"icon","href":"/favicon.svg","type":"image/svg+xml"}],["$","link","25",{"rel":"icon","href":"/favicon.ico","sizes":"48x48"}],["$","link","26",{"rel":"apple-touch-icon","href":"/apple-touch-icon.png"}]]
1:null
