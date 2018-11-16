import {ExtraMilageCharge} from "./ExtraMilageCharge";
import {WaitingCharge} from "./WaitingCharge";
import {ExtraDayCharge} from "./ExtraDayCharge";

export  class VehicleType{

  vehicleTypeID:number;
  fuelType:string;
  typeName:string;
  extramileagechargeList:Array<ExtraMilageCharge>;
  waitingtimechargeList:Array<WaitingCharge>;
  extradaychargeList:Array<ExtraDayCharge>;

}
