import { checkQuests } from "./gamification";

export function createAboutMePanel() {
  const panel = document.createElement("div");
  panel.id = "aboutMePanel";
  panel.classList.add("modal");

  const closeButton = document.createElement("button");
  closeButton.classList.add("close-btn");
  closeButton.innerHTML = `<i class="fas fa-times"></i>`;
  closeButton.onclick = closeAboutMe;

  const aboutContent = document.createElement("div");
  aboutContent.classList.add("about-content");

  const heading = document.createElement("h1");
  heading.textContent = "About Me";

  const experienceYears = new Date().getFullYear() - 2016;

  const aboutMeText = `
    Hi, I'm Matheus Morett, a passionate software engineer with over ${experienceYears} years of professional experience in the tech industry. 
    From the moment I wrote my first line of code in January 2014, I’ve been dedicated to crafting solutions that don’t just work but excel.
    <br><br>
    Throughout my career, I’ve been fortunate to collaborate with both early and late-stage startups, 
    delivering impactful products that have reached millions of users worldwide. I thrive in fast-paced environments 
    where innovation is key, always pushing boundaries to bring the best possible user experiences to life.
    <br><br>
    While I’m a FullStack developer with a focus on FrontEnd, I embrace every challenge. 
    My true passion lies in solving complex problems and bringing high-quality solutions to market.
    <br><br>
    My primary tech stack includes TypeScript, React, and Node, but I’m constantly learning and growing to stay ahead of the curve. 
    <br><br>
    Right now, what excites me most is building scalable, testable, and maintainable software—engineering solutions 
    that not only work today but will stand the test of time.
  `;


  const paragraph = document.createElement("p");
  paragraph.innerHTML = aboutMeText;

  aboutContent.appendChild(heading);
  aboutContent.appendChild(paragraph);
  panel.appendChild(closeButton);
  panel.appendChild(aboutContent);

  document.body.appendChild(panel);
}

export function showAboutMe() {
  const panel = document.getElementById("aboutMePanel");
  if (panel) {
    panel.style.display = "flex";
  }
}

function closeAboutMe() {
  const panel = document.getElementById("aboutMePanel");
  
  window.questTracker.aboutMe = true;
  checkQuests();
  
  if (panel) {
    panel.style.display = "none";
    setTimeout(() => {
      window.aboutMeShown = false;
    }, 100)
  }
}