# Test Gemini API Key Script
param(
    [Parameter(Mandatory=$true)]
    [string]$ApiKey
)

Write-Host "Testing Gemini API with provided key..." -ForegroundColor Green

# Force TLS 1.2 (Windows fix)
[Net.ServicePointManager]::SecurityProtocol = [Net.SecurityProtocolType]::Tls12

$url = "https://generativelanguage.googleapis.com/v1beta/models/gemini-flash-latest:generateContent?key=$ApiKey"

$body = @{
    contents = @(
        @{
            parts = @(
                @{
                    text = "Hello, how are you?"
                }
            )
        }
    )
} | ConvertTo-Json -Depth 5

try {
    $response = Invoke-RestMethod `
        -Method Post `
        -Uri $url `
        -Headers @{ "Content-Type" = "application/json" } `
        -Body $body

    Write-Host "`n✅ SUCCESS RESPONSE:" -ForegroundColor Green
    Write-Host $response.candidates[0].content.parts[0].text
}
catch {
    Write-Host "`n❌ ERROR OCCURRED" -ForegroundColor Red
    Write-Host "Status Code:" $_.Exception.Response.StatusCode.value__
    
    if ($_.Exception.Response.GetResponseStream()) {
        $reader = New-Object System.IO.StreamReader($_.Exception.Response.GetResponseStream())
        Write-Host "Response:" $reader.ReadToEnd()
    }
}
