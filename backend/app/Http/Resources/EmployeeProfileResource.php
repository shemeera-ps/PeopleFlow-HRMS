<?php

namespace App\Http\Resources;

use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\JsonResource;

class EmployeeProfileResource extends JsonResource
{
    /**
     * Transform the resource into an array.
     *
     * @return array<string, mixed>
     */
    // public function toArray(Request $request): array
    // {
    //     return parent::toArray($request);
    // }
    public function toArray(Request $request): array
    {
        return [
            'id' => $this->id,

            'user' => [
                'id' => $this->user->id,
                'employee_id' => $this->user->employee_id,
                'name' => $this->user->name,
                'email' => $this->user->email,
            ],

            'phone' => $this->phone,
            'alternate_phone' => $this->alternate_phone,

            'date_of_birth' => $this->date_of_birth,

            'gender' => $this->gender,

            'marital_status' => $this->marital_status,

            'blood_group' => $this->blood_group,

            'nationality' => $this->nationality,

            'address_line_1' => $this->address_line_1,
            'address_line_2' => $this->address_line_2,
            'city' => $this->city,
            'state' => $this->state,
            'country' => $this->country,
            'postal_code' => $this->postal_code,

            'emergency_contact_name' => $this->emergency_contact_name,
            'emergency_contact_phone' => $this->emergency_contact_phone,
            'emergency_contact_relationship' => $this->emergency_contact_relationship,
        ];
    }
}
