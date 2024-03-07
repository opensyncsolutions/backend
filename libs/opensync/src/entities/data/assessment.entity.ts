import { Entity } from 'typeorm';
import { DateEntity } from '../general/date.entity';

@Entity('assessment')
export class Assessment extends DateEntity {}

/*
{
                "id": "00204ce1-3fee-4ed7-b52f-51564601c224",
                "created_at": "2023-05-09T00:00:00.000000Z",
                "updated_at": null,
                "studyID": "",
                "CTC_ID": "00000000000008",
                "clinicID": "0097ff83-f290-4a87-b891-feb017b162c0",
                "DCID": "9eb137c9-59dc-4158-814d-c1ad1caefa9d",
                "startdate": "09\/05\/2023 14:28:57",
                "version": "V 2.0.0",
                "participant_info_verification": "1",
                "more_information_consent": "1",
                "study_participation_consent": "1",
                "hpon_staff_availability": "1",
                "phone_one": "9841534651",
                "phone_two": "",
                "phone_three": "",
                "phone_four": "",
                "phone_five": "",
                "next_appointment_date": null,
                "any_question": null,
                "participant_question": null,
                "clinic": {
                    "id": "0097ff83-f290-4a87-b891-feb017b162c0",
                    "name": "Geita Regional Referral Hospital"
                },
                "high_risk": null
            }
*/
