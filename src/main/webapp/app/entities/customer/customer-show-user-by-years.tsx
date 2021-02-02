import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import { Link, RouteComponentProps } from 'react-router-dom';
import { Button, Row, Col } from 'reactstrap';
import { Translate, ICrudGetAction, TextFormat } from 'react-jhipster';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { Chart } from 'primereact/chart';

import { IRootState } from 'app/shared/reducers';
import { getUsersByYears } from './customer-yearage.reducer';

import 'primeicons/primeicons.css';
import 'primereact/resources/themes/saga-blue/theme.css';
import 'primereact/resources/primereact.css';
import 'primeflex/primeflex.css';
// import '../../index.css';
// import ReactDOM from 'react-dom';

import Logger from 'console-log-level';



export interface ICustomerShowUserByYearsProps extends StateProps, DispatchProps, RouteComponentProps<{url: string}> {}


export const CustomerShowUserByYears = (props: ICustomerShowUserByYearsProps) => {
    const log = Logger({level: 'trace'});
    
   

    useEffect(() => {
        props.getUsersByYears()
        
        }, []);

   
        const  {customerAgeList} = props;
        log.debug(customerAgeList.length);
    
        const converArrayToMap = () =>{
            const label1 = [];
            const data1 = [];
            log.debug("I did come here2")
            customerAgeList.forEach(element => {
                log.debug("Surprise >>" + element.count)
                label1.push(element.year);
                data1.push(element.count);
                log.debug(" kskskk "+label1.length)
            });

            return {
                label1,
                data1,
            }
        }

        useEffect(() => {
            converArrayToMap();
        })
        const { label1 } = converArrayToMap();
        const { data1 } = converArrayToMap();

        log.debug("><>>" +label1.length);
        log.debug("><>>>" +data1.length);
   /*
    const getUsersByYears => {
        props.getUsersByYears
    } ;
    */
  
    
    log.debug(">>>" +label1.length);
    log.debug(">>>" +data1.length);
     

      const basicData =  {
        
        labels: label1,
        datasets: [
            {
                label: 'No of Accounts',
                backgroundColor: '#42A5F5',
                data: data1
            }
        ]
    };

        const getLightTheme = () => {
            const basicOptions = {
                legend: {
                    labels: {
                        fontColor: '#495057'
                    }
                },
                scales: {
                    xAxes: [{
                        ticks: {
                            fontColor: '#495057'
                        }
                    }],
                    yAxes: [{
                        ticks: {
                            fontColor: '#495057'
                        }
                    }]
                }
            };
    
            
                
            return {
                basicOptions,
               
            }
        };
    

    //  const { customerEntity } = props;
      const { basicOptions } = getLightTheme();
      return (
        
        <div>
        <div className="card">
            <h5>Vertical</h5>
            <Chart type="bar" data={basicData} options={basicOptions} />
        </div>
        </div>

        ); 

};


const mapStateToProps = ({ customerAge }: IRootState) => ({
    customerAgeList: customerAge.entities,
  });
const mapDispatchToProps = { getUsersByYears };

type StateProps = ReturnType<typeof mapStateToProps>;
type DispatchProps = typeof mapDispatchToProps;

export default connect(mapStateToProps, mapDispatchToProps)(CustomerShowUserByYears);

