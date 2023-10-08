<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class CreateSellersTable extends Migration
{
    public function up()
    {
        Schema::create('sellers', function (Blueprint $table) {
            $table->id();
            $table->string('name', 50);
            $table->string('email', 50)->unique();
            $table->string('password', 255);
            $table->timestamps();
            $table->string('proof_document', 255)->nullable();
            $table->tinyInteger('accepted')->nullable();
        });
    }

    public function down()
    {
        Schema::dropIfExists('sellers');
    }
}
