import {Component, Input, OnInit} from '@angular/core';
import {ActivatedRoute, Params}   from '@angular/router';
import {Location}                 from '@angular/common';

import {HeroService} from './hero.service';

import 'rxjs/add/operator/switchMap';
import {Hero} from "./hero";

@Component({
  moduleId: module.id,
  selector: 'my-hero-detail',
  templateUrl: './hero-detail.component.html',
  styleUrls: ['./hero-detail.component.css']
})

export class HeroDetailComponent implements OnInit {
  ngOnInit(): void {
    this.route.params
      .switchMap((params: Params) => this.heroService.getHero(+params['id']))// the + converts string parameter id into number
      .subscribe(h => this.hero = h)
  }

  constructor(private heroService: HeroService,
              private route: ActivatedRoute,
              private location: Location) {
  }

  goBack(): void {
    this.location.back();
  }

  save():void{
    this.heroService.update(this.hero)
      .then(() =>  this.goBack());
  }


  @Input()
  hero: Hero;

}
