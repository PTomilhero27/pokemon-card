import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { CardModule } from 'primeng/card';
import { AvatarModule } from 'primeng/avatar';
import { ButtonModule } from 'primeng/button';
import { DomSanitizer, SafeHtml } from '@angular/platform-browser';

@Component({
  selector: 'app-user-profile',
  standalone: true,
  imports: [CommonModule, CardModule, AvatarModule, ButtonModule],
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss'],
})
export class ProfileComponent implements OnInit {
  user = {
    firstName: 'Pedro',
    lastName: 'Tomilhero',
    email: 'ptomilhero27@gmail.com',
    jobTitle: 'Desenvolvedor FullStack',
    avatar: 'selfie.jpg',
    about: `<p>Sou um programador altamente motivado e versátil, tenho facilidade em aprender e me adaptar rapidamente a novas tecnologias, o que me permite enfrentar projetos desafiadores com confiança e eficiência. Ao longo da minha carreira, desenvolvi uma sólida experiência em Angular, partindo do zero e me tornando um programador experiente nessa tecnologia.</p>
    <p>Além disso, minha experiência em outras tecnologias ampliou meu conjunto de habilidades e me permitiu atuar em diferentes áreas do desenvolvimento de software. Estou sempre aberto a aprender coisas novas e buscar desafios que promovam meu crescimento profissional. Tenho um aprendizado contínuo, acompanhando as últimas tendências e avanços no campo da programação. Sou apaixonado por adquirir novos conhecimentos e aplicá-los em projetos práticos.</p>
    <p>Meu entusiasmo por desafios me impulsiona a trabalhar de forma independente, encontrando soluções criativas e eficientes para problemas complexos. Resumindo, minha sólida experiência em Angular demonstra minha versatilidade como programador. Estou preparado para enfrentar novos desafios, adquirir novas habilidades e contribuir para o sucesso de projetos de programação estimulantes.</p>
    <p>Tecnologias:</p>
    <ul>
      <li>Front-end: Angular, Rxjs, NgRx, JavaScript (Typescript, ES6+), CSS3 (SCSS, taiwind), Jasmine, PWAs, noções em UI/UX.</li>
      <li>Back-end: Conhecimentos em Spring Boot, MySQL, MongoDB, Docker, REST, Clean-architecture, SOLID, DDD.</li>
      <li>Devops: GitLab, Jenkins, Sonar Qube, Fortify, Azure, Aws.</li>
    </ul>`,
  };

  safeAboutContent!: SafeHtml;

  constructor(private sanitizer: DomSanitizer) {}

  ngOnInit() {
    this.safeAboutContent = this.sanitizer.bypassSecurityTrustHtml(
      this.user.about
    );
  }
}
