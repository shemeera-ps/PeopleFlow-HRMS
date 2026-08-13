<?php

namespace App\Console\Commands;

use Illuminate\Console\Attributes\Description;
use Illuminate\Console\Attributes\Signature;
use Illuminate\Console\Command;

#[Signature('app:a-b-c-d')]
#[Description('Command description')]
class ABCD extends Command
{
    /**
     * Execute the console command.
     */
    public function handle()
    {
        //
    }
}
