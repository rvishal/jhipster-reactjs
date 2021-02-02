import axios from 'axios';

import {
    IPayloadResult,
    ICrudGetAllAction
    } from 'react-jhipster';
import { cleanEntity } from 'app/shared/util/entity-utils';
import { REQUEST, SUCCESS, FAILURE } from 'app/shared/reducers/action-type.util';

import { ICustomerYearAge , defaultValue2} from 'app/shared/model/customer-yearage.model';


export const ACTION_TYPES = {
    RESET: 'customer/RESET',
    SHOW_CUSTOMER: 'customer/SHOW_CUSTOMER'
    
  };

const instialCustomerAgeState = {
    loading: false,
    errorMessage: null,
    entities: [] as ReadonlyArray<ICustomerYearAge>,
    entity: defaultValue2,
    links: { next: 0 },
    updating: false,
    totalItems: 0,
    updateSuccess: false,
  };

  export type CustomerAgeState = Readonly<typeof instialCustomerAgeState>;


  export default (state: CustomerAgeState = instialCustomerAgeState, action): CustomerAgeState => {
    switch (action.type) {
        case REQUEST(ACTION_TYPES.SHOW_CUSTOMER):
            return {
                ...state,
                errorMessage: null,
                updateSuccess: false,
                loading: true,
              };
        case SUCCESS(ACTION_TYPES.SHOW_CUSTOMER):
            return {
                ...state,
                 loading: false,
                 entities: action.payload.data,
             };
        case FAILURE(ACTION_TYPES.SHOW_CUSTOMER):
                return {
                  ...state,
                  loading: false,
                  updating: false,
                  updateSuccess: false,
                  errorMessage: action.payload,
                };
        case ACTION_TYPES.RESET:
                 return {
                 ...instialCustomerAgeState,
                    };
        default:
                    return state;
    }


  };

  const apiUrl = 'api/customers';


  export const getUsersByYears : ICrudGetAllAction<ICustomerYearAge> =() => {
    const requestUrl = `${apiUrl}/getUsersByYears`;
    return {
      type: ACTION_TYPES.SHOW_CUSTOMER,
      payload: axios.get<ICustomerYearAge>(`${requestUrl}`),
    };
  };