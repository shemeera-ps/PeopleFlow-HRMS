<?php

namespace App\Http\Requests\designation;

use Illuminate\Contracts\Validation\ValidationRule;
use Illuminate\Foundation\Http\FormRequest;

class UpdateDesignationRequest extends FormRequest
{
    /**
     * Determine if the user is authorized to make this request.
     */
    public function authorize(): bool
    {
        return true;
    }

    /**
     * Get the validation rules that apply to the request.
     *
     * @return array<string, ValidationRule|array<mixed>|string>
     */
    public function rules(): array
    {
        return [
            'name' => 'nullable|string|max:255|unique:designations,name,' . $this->route('id'),
            'code' => 'nullable|string|max:255|unique:designations,code,' . $this->route('id'),
            'description' => 'nullable|string',
            'department_id' => 'nullable|exists:departments,id',
            'updated_by' => 'nullable|exists:users,id',
        ];
    }
}
