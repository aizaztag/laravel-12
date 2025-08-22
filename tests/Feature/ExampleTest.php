<?php

test('the application returns a successful response', function () {
    $response = $this->get('/');
    
    //ds('Hello LaraDumps!');      // Values and variables
    ds($response);

    $response->assertStatus(200);
});
