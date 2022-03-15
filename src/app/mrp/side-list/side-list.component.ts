import { Component, OnInit } from '@angular/core';
import { AvailableLevels, Product } from 'src/app/core/models/Product';

const PRODUCT_PARTS: Product[] = [
  {
    name: 'Rower',
    level: AvailableLevels.zero,
  },
  {
    name: 'Koła',
    level: AvailableLevels.one,
  },
  {
    name: 'Hamulce',
    level: AvailableLevels.one,
  },
  {
    name: 'Rama',
    level: AvailableLevels.one,
  },
  {
    name: 'Napęd',
    level: AvailableLevels.one,
  },
  {
    name: 'Szprychy',
    level: AvailableLevels.two,
  },
  {
    name: 'Opona',
    level: AvailableLevels.two,
  },
  {
    name: 'Linka',
    level: AvailableLevels.two,
  },
  {
    name: 'Zaciski',
    level: AvailableLevels.two,
  },
  {
    name: 'Sztyca',
    level: AvailableLevels.two,
  },
  {
    name: 'Widelec',
    level: AvailableLevels.two,
  },
  {
    name: 'Przerzutka',
    level: AvailableLevels.two,
  },
  {
    name: 'Pedały',
    level: AvailableLevels.two,
  },
  {
    name: 'Korba',
    level: AvailableLevels.two,
  },
  {
    name: 'Łańcuch',
    level: AvailableLevels.two,
  },
  {
    name: 'Zębatki',
    level: AvailableLevels.two,
  },
];

const PRODUCT_LEVELS: number[] = [0, 1, 2];
@Component({
  selector: 'app-side-list',
  templateUrl: './side-list.component.html',
  styleUrls: ['./side-list.component.scss'],
})
export class SideListComponent implements OnInit {
  public data = PRODUCT_PARTS;
  public levels = PRODUCT_LEVELS;
  constructor() {}

  ngOnInit(): void {}
}
