<?php

namespace App\Services;

use App\Models\DrawRoulette;
use Google\Client;
use Google\Service\Drive;
use Illuminate\Support\Facades\Log;

class GoogleDriveService
{
   public static function get_client()
   {
       $client = new Client();
       $application_creds = __DIR__ . '/draw-roulette-service-account.json';
       $client->setApplicationName('Google Drive API Draw Roulette');
       $client->setScopes('https://www.googleapis.com/auth/drive');
       $client->setAuthConfig($application_creds);
       
       return $client;
   }

   public static function get_folders($folderId){
    $folders = DrawRoulette::all()->toArray();
    $folder_map = array_map(function ($v){
        return("'".$v['drive_id']."'".' in parents');
    }, $folders);
    $allfoldersCondition = implode(' or ', $folder_map); 
    $foldersCondition = $folderId ? "'{$folderId}' in parents" :  "({$allfoldersCondition})";
    return $foldersCondition;
   }

   public static function get_photos($folder){
    $optParams = array(
        'pageSize' => 100,
        'fields' => "files(id,name,thumbnailLink,webViewLink)",
        'q' => self::get_folders($folder)
        );
        $client = self::get_client();
        $service = new Drive($client);
        $result = $service->files->listFiles($optParams);
        $files = array();
        // $fileById = $service->files->get($fileId);
        foreach($result->getFiles() as $file){
            $obj = array(
                "name" => $file->getName(),
                "id" => $file->getId(),
                "thumbnailLink" => $file->getThumbnailLink(),
                "webViewLink" => $file->getWebViewLink()
            );
            array_push($files, $obj);
        }
        return $files;
   }
}