<?php

namespace App\Http\Transformers;

use App\Models\ManagementMenu;

class ManagementMenuTransformer
{
    public function transform(ManagementMenu $managementMenu): array
    {
        return [
            'name' => $managementMenu->name,
            'href' => route('guest.about-us', $managementMenu->slug)
        ];
    }
}
