# Frontend Mentor - Multi-step form solution

This is a solution to the [Multi-step form challenge on Frontend Mentor](https://www.frontendmentor.io/challenges/multistep-form-YVAnSdqQBJ). Frontend Mentor challenges help you improve your coding skills by building realistic projects. 

## Table of contents

- [Overview](#overview)
  - [The challenge](#the-challenge)
  - [Screenshot](#screenshot)
  - [Links](#links)
- [My process](#my-process)
  - [Built with](#built-with)
  - [What I learned](#what-i-learned)
  - [Continued development](#continued-development)
  - [Useful resources](#useful-resources)
  - [AI Collaboration](#ai-collaboration)
- [Author](#author)
- [Acknowledgments](#acknowledgments)


## Overview

### The challenge

Users should be able to:

- Complete each step of the sequence
- Go back to a previous step to update their selections
- See a summary of their selections on the final step and confirm their order
- View the optimal layout for the interface depending on their device's screen size
- See hover and focus states for all interactive elements on the page
- Receive form validation messages if:
  - A field has been missed
  - The email address is not formatted correctly
  - A step is submitted, but no selection has been made

### Screenshot

Larger Screens

![](./assets/images/lrgscreens.png)

Mobile Screens

![](./assets/images/mobilescreens.png)


### Links

- Solution URL: [Github Link](https://github.com/issagoodlifeInc/multi-step-form.git)
- Live Site URL: [Netlify Deploy](https://your-live-site-url.com)

## My process

### Built with

- Semantic HTML5 markup
- CSS custom properties
- Flexbox
- CSS Grid
- Mobile-first workflow
- [React](https://reactjs.org/) - JS library
- [Next.js](https://nextjs.org/) - React framework

### What I learned

Making Data your friend and a  bit of form validation;


```js
  const steps = ["Your info", "Select plan", "Add-ons", "Summary"];
const plans = [
  { name: "Arcade", monthly: 9, yearly: 90, icon: "arcade" },
  { name: "Advanced", monthly: 12, yearly: 120, icon: "advanced" },
  { name: "Pro", monthly: 15, yearly: 150, icon: "pro" },
];
const addOns = [
  { name: "Online service", description: "Access to multiplayer games", monthly: 1, yearly: 10 },
  { name: "Larger storage", description: "Extra 1TB of cloud save", monthly: 2, yearly: 20 },
  { name: "Customizable Profile", description: "Custom theme on your profile", monthly: 2, yearly: 20 },
];

function formatPrice(amount, yearly) {
  return `$${amount}/${yearly ? "yr" : "mo"}`;
}

function validateInfo(info) {
  const errors = {};
  if (!info.name.trim()) errors.name = "This field is required";
  if (!info.email.trim()) errors.email = "This field is required";
  else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(info.email.trim())) {
    errors.email = "Please enter a valid email address";
  }
  const phoneDigits = info.phone.replace(/\D/g, "");
  if (!info.phone.trim()) errors.phone = "This field is required";
  else if (phoneDigits.length < 7 || phoneDigits.length > 15) {
    errors.phone = "Please enter a valid phone number";
  }
  return errors;
}

```

### Continued development

Learning how to better utilize AI to get as much out of it but to also keep my learning going.

### Useful resources


### AI Collaboration

GitHub Copilot was used to scaffold the Next.js app and implement the multi-step subscription flow, including form validation, plan selection, add-ons, summary totals, and responsive styling. The supplied style guide and project assets informed the visual design. The app should be manually reviewed across browsers and assistive technologies before production use.

## Author

- Name: Lesley Kimutai
- Portfolio: [Lesley Kimutai](https://lesleykimutai.netlify.app/)
- Frontend Mentor: [@Leskim](https://www.frontendmentor.io/profile/Leskim)
- Twitter: [@KimutaiLesley](https://twitter.com/KimutaiLesley)

## Acknowledgments

This project is a product of the challenge brief, the frontend learning process, and a collaborative build approach with GitHub Copilot.

- Acknowledged builder: GitHub Copilot, for helping structure the app, suggest the implementation flow, and document the work.
- Acknowledged owner: Lesley Kimutai, for guiding the project direction, prompts, and final review.
- Prompt-driven notes: this README reflects the work done to turn a design brief into a functioning, responsive space tourism website.

Thank you for visiting this project and for the prompt-driven process that made it possible.