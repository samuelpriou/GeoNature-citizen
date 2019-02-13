import { Component, OnChanges, Input } from "@angular/core";
// import { FormGroup } from "@angular/forms";

import { FeatureCollection, Feature } from "geojson";

@Component({
  selector: "app-obs-list",
  templateUrl: "./list.component.html",
  styleUrls: ["./list.component.css"]
})
export class ObsListComponent implements OnChanges {
  @Input("observations") obs: FeatureCollection;
  @Input("taxa") surveySpecies: any[];
  observations: Feature[] = [];
  program_id: number;
  taxa: any[];

  ngOnChanges() {
    if (this.obs) {
      this.observations = this.obs["features"];
    }
  }
}