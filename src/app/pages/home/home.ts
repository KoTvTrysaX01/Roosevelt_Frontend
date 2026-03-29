import { Component } from '@angular/core';
import { HeroSection } from "../../components/hero-section/hero-section";
import { ContactForm } from "../../components/contact-form/contact-form";

@Component({
  selector: 'app-home',
  imports: [HeroSection, ContactForm],
  templateUrl: './home.html',
  styleUrl: './home.scss',
})
export class Home {

}
