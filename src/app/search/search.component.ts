import { map } from 'rxjs/operators';
import { Launch, eCriteria } from './../services/models';
import { Component, OnInit } from '@angular/core';
import { ApiService } from '../services/api.service';

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.css'],
  providers: [ApiService]
})
export class SearchComponent implements OnInit {

  private _criteria: eCriteria;
  public _data: any[];
  private _valueId: number;
  public _launches: any[];

  constructor(private api: ApiService) { }

  ngOnInit() {
    this.api
      .getLaunches$()
      .subscribe((res: any[]) => this._data = []);
  }

  onChangeCriteria = (criteria: eCriteria) => {
    console.log('onChangeCriteria: ' + criteria);

    this._criteria = criteria;
    this._launches = [];
    switch (<eCriteria>criteria) {
      case eCriteria.Agencia:
        this.api
          .getAgencies$()
          .subscribe((res: any[]) => this._data = res);
        break;
      case eCriteria.Estado:
        this.api
          .getTypesStatus$()
          .subscribe((res: any[]) => this._data = res);
        break;
      case eCriteria.Tipo:
        this.api
          .getTypesMissions$()
          .subscribe((res: any[]) => this._data = res);
        break;
      default:
        this._data = [];
        break;
    }
  }

  onChangeValue = (value: number) => {
    console.log('onChangeValue: ' + value);

    this._valueId = value;
    this.api
      .getLaunches$()
      .subscribe(launches => {
        const launchesFilter: Launch[] = launches.filter((launch: Launch) =>
          {
            let valido = false;
            if (this._valueId > 0) {
              switch (<eCriteria>this._criteria) {
                case eCriteria.Agencia:
                  valido = launch.agencie === this._valueId;
                  break;
                case eCriteria.Estado:
                  valido = launch.status === this._valueId;
                  break;
                case eCriteria.Tipo:
                  valido = launch.typeMission === this._valueId;
                  break;
              }
            }
            return valido;
          }
        );
        this._launches = launchesFilter;
      });
  }

}
