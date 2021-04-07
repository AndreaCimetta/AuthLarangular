<?php


namespace App\UtilityLibraries;


use Symfony\Component\HttpFoundation\Response;

class CustomResponse
{
    /**
     * success response method.
     *
     * @param $result
     * @param $message
     * @param int $statusCode
     * @return \Illuminate\Http\JsonResponse
     */
    public static function sendResponse($result, $message, $statusCode = Response::HTTP_OK)
    {
        $response = [
            'success' => true,
            'data'    => $result,
            'status' => $statusCode,
            'message' => $message
        ];


        return response()->json($response, $statusCode);
    }


    /**
     * return error response.
     *
     * @param $error
     * @param array $errorMessages
     * @param int $statusCode
     * @return \Illuminate\Http\JsonResponse
     */
    public static function sendErrorResponse($error, $errorMessages = [], $statusCode = Response::HTTP_NOT_FOUND)
    {
        $response = [
            'success' => false,
            'status' => $statusCode,
            'message' => $error,
        ];


        if(!empty($errorMessages)){
            $response['data'] = $errorMessages;
        }


        return response()->json($response, $statusCode);
    }
}
