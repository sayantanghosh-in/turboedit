export const DEFAULT_EDITOR_CONTENT = `<div class="content">
  <h1>Welcome to TurboEdit 🚀</h1>
  <p></p>
  <p>This is a beautiful blank canvas, but it's not actually blank! We've populated it with this document to show you what our app can do right out of the box.</p>
  <p></p>
  <p>Try editing this text on the left. As you type, you'll see the rendered result instantly appear here on the right.</p>
  <p></p>
  <h3>Markdown Showcase</h3>
  <p>This section demonstrates some of the most common Markdown syntax.</p>
  <p></p>
  <h4>Headers</h4>
  <p>You can create headers using \`#\` symbols. More hashes mean a smaller heading.</p>
  <h1>Heading 1</h1>
  <h1>Heading 2</h2>
  <h3>Heading 3</h3>
  <h4>Heading 4</h4>
  <h5>Heading 5</h5>
  <h6>Heading 6</h6>
  <p></p>
  <h4>Text Formatting</h4>
  <p>Make your text <strong>bold</strong> using two asterisks or two underscores (<strong>bold</strong> or <strong>bold</strong>). You can also make it <em>italic</em> with a single asterisk or underscore (<em>italic</em> or <em>italic</em>).</p>
  <p></p>
  <h4>Lists</h4>
  <p>Use an asterisk or hyphen for a bulleted list, and numbers for a numbered list.</p>
  <ul>
    <li>Item one</li>
    <li>Item two
      <ul>
        <li>A nested item</li>
      </ul>
    </li>
    <li>Item three</li>
  </ul>
  <ol>
    <li>First item</li>
    <li>Second item</li>
    <li>Third item</li>
  </ol>
  <p></p>
  <h4>Links</h4>
  <p>Create a link to a website like this: <a href="https://www.google.com">Visit Google</a>.</p>
  <p></p>
  <h4>Code</h4>
  <p>You can display <code>inline code</code> or a full code block like this:</p>
  <pre><code class="language-javascript">// This is a code block
function sayHello() {
  console.log("Hello, world!");
}</code></pre>
  <p></p>
  <h4>Quotes</h4>
  <p>Use the <code>></code> symbol for a blockquote.</p>
  <blockquote>
    <p>"The only way to do great work is to love what you do."<br>— Steve Jobs</p>
  </blockquote>
  <p></p>
  <h3>Ready?</h3>
  <p>Now it's your turn. Delete all of this text and start writing your own content!</p>
</div>`;

export const SESSION_STORAGE_KEY = "turboedit-json-data";

export const FRONT_MATTER_LOCAL_STORAGE_KEY = "turboedit-frontmatter-data";
