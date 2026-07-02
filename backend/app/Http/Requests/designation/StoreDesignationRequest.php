<?php

namespace App\Http\Requests\designation;

use Illuminate\Contracts\Validation\ValidationRule;
use Illuminate\Foundation\Http\FormRequest;

class StoreDesignationRequest extends FormRequest
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
            'name' => 'required|string|max:255|unique:designations,name',
            'code' => 'required|string|max:255|unique:designations,code',
            'description' => 'nullable|string',
            'department_id' => 'required|exists:departments,id',
            'created_by' => 'nullable|exists:users,id',
        ];
    }
}
