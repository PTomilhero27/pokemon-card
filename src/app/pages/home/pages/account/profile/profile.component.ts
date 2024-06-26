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
    phone: '5511941780315',
    jobTitle: 'Desenvolvedor FullStack',
    avatar: 'selfie.jpg',
    about: `<p>Sou um programador altamente motivado e versátil, tenho facilidade em aprender e me adaptar rapidamente a novas tecnologias, o que me permite enfrentar projetos desafiadores com confiança e eficiência. Ao longo da minha carreira, desenvolvi uma sólida experiência em Angular, partindo do zero e me tornando um programador experiente nessa tecnologia.</p>
    <p>Além disso, minha experiência em outras tecnologias ampliou meu conjunto de habilidades e me permitiu atuar em diferentes áreas do desenvolvimento de software. Estou sempre aberto a aprender coisas novas e buscar desafios que promovam meu crescimento profissional. Tenho um aprendizado contínuo, acompanhando as últimas tendências e avanços no campo da programação. Sou apaixonado por adquirir novos conhecimentos e aplicá-los em projetos práticos.</p>
    <p>Meu entusiasmo por desafios me impulsiona a trabalhar de forma independente, encontrando soluções criativas e eficientes para problemas complexos. Resumindo, minha sólida experiência em Angular demonstra minha versatilidade como programador. Estou preparado para enfrentar novos desafios, adquirir novas habilidades e contribuir para o sucesso de projetos de programação estimulantes.</p>
    <p>Tecnologias:</p>
    <ul>
      <li>
        <strong>Front-end (Intermediário/Avançado):</strong>
        Angular, RxJS, NgRx, JavaScript (TypeScript), CSS3 (SCSS, Tailwind), React, React Native, Next.js, Vue.
      </li>
      <li>
        <strong>Back-end (Iniciante/Intermediário):</strong>
        Conhecimentos em Spring Boot, MySQL, Node.js, Nest.js, Prisma, REST, Clean Architecture, SOLID, DDD.
      </li>
      <li>
        <strong>DevOps (Iniciante):</strong>
        GitLab, Azure, AWS.
      </li>
      <li>
        <strong>Design e UX/UI:</strong>
        Figma.
      </li>
      <li>
        <strong>Testes Unitários:</strong>
        Experiência em testes unitários.
      </li>
    </ul>
    `,
  };

  safeAboutContent!: SafeHtml;

  constructor(private sanitizer: DomSanitizer) {}

  ngOnInit() {
    this.safeAboutContent = this.sanitizer.bypassSecurityTrustHtml(
      this.user.about
    );
  }

  getWhatsAppLink(phoneNumber: string): string {
    // Remova quaisquer caracteres indesejados
    return phoneNumber.replace(/[^0-9]/g, '');
  }
}
