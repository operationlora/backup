
# GEMINI.md

## Project Overview

This project is a Jekyll-based theme called "Photorama," designed for photo-bloggers and artists. It's built on the "Clean Blog" theme and is intended for use with GitHub Pages. The project uses Grunt for task automation (like minifying JavaScript and compiling LESS), and includes features like Disqus comments, Tinyletter integration for newsletters, and a gallery system.

## Building and Running

This is a Jekyll project. To build and run it locally, you would typically use the following commands:

```bash
# Install dependencies
bundle install

# Serve the site locally
bundle exec jekyll serve
```

**Note:** The `Gruntfile.js` suggests that `grunt` is used for asset compilation. You may need to run `npm install` and `grunt` to build the CSS and JavaScript assets.

```bash
# Install npm dependencies
npm install

# Run grunt tasks (uglify, less)
grunt
```

## Development Conventions

*   **Configuration:** The main site configuration is in `_config.yml`. This file includes settings for the site title, social media links, navigation, and more.
*   **Styling:** The project uses LESS for styling, with the main file likely being `less/photorama.less`. The compiled CSS is output to the `css` directory.
*   **JavaScript:** Custom JavaScript is located in `js/photorama.js` and minified to `js/photorama.min.js`.
*   **Content:**
    *   Blog posts are located in the `_posts` directory.
    *   Gallery content is managed through the `gallery` and `_shop` directories.
    *   Pages are in the `about`, `gallery`, `journal`, and `shop` directories.
*   **Layouts:** The HTML layouts are in the `_layouts` directory, and reusable components are in the `_includes` directory.
*   **Dependencies:** Ruby gems are managed via a `Gemfile` (not present, but implied by Jekyll), and Node.js dependencies are in `package.json`.
