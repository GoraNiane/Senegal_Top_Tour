Add-Type -AssemblyName System.Drawing

function Compress-ImageFile {
    param(
        [string]$InputPath,
        [string]$OutputPath,
        [int]$MaxWidth = 1400,
        [long]$Quality = 85L
    )

    if (-not (Test-Path $InputPath)) {
        Write-Host "File not found: $InputPath"
        return
    }

    $origSize = [math]::Round((Get-Item $InputPath).Length / 1MB, 2)
    Write-Host "Processing $InputPath ($origSize MB)..."

    $img = [System.Drawing.Image]::FromFile($InputPath)
    $origWidth = $img.Width
    $origHeight = $img.Height

    $newWidth = $origWidth
    $newHeight = $origHeight

    if ($origWidth -gt $MaxWidth) {
        $newWidth = $MaxWidth
        $newHeight = [int](($origHeight / $origWidth) * $MaxWidth)
    }

    $bmp = New-Object System.Drawing.Bitmap $newWidth, $newHeight
    $graph = [System.Drawing.Graphics]::FromImage($bmp)
    $graph.CompositingQuality = [System.Drawing.Drawing2D.CompositingQuality]::HighQuality
    $graph.SmoothingMode = [System.Drawing.Drawing2D.SmoothingMode]::HighQuality
    $graph.InterpolationMode = [System.Drawing.Drawing2D.InterpolationMode]::HighQualityBicubic

    $graph.DrawImage($img, 0, 0, $newWidth, $newHeight)

    $img.Dispose()
    $graph.Dispose()

    # Find JPEG / PNG Encoder
    $codec = [System.Drawing.Imaging.ImageCodecInfo]::GetImageEncoders() | Where-Object { $_.FormatDescription -eq "JPEG" }
    $encoderParams = New-Object System.Drawing.Imaging.EncoderParameters(1)
    $encoderParams.Param[0] = New-Object System.Drawing.Imaging.EncoderParameter([System.Drawing.Imaging.Encoder]::Quality, $Quality)

    $tempOutput = $OutputPath + ".tmp"
    $bmp.Save($tempOutput, $codec, $encoderParams)
    $bmp.Dispose()

    if (Test-Path $OutputPath) {
        Remove-Item $OutputPath -Force
    }
    Move-Item $tempOutput $OutputPath -Force

    $newSize = [math]::Round((Get-Item $OutputPath).Length / 1KB, 1)
    Write-Host "  -> Saved to $OutputPath ($newSize KB)"
}

$images = @(
    "frontend/public/images/dakar.png",
    "frontend/public/images/dakar4.png",
    "frontend/public/images/dakar5.png",
    "frontend/public/images/hero.png",
    "frontend/public/hero.png",
    "frontend/src/assets/hero.png",
    "frontend/public/images/hero-goree-sunset.jpg"
)

foreach ($img in $images) {
    $fullPath = (Resolve-Path $img -ErrorAction SilentlyContinue)
    if ($fullPath) {
        $backup = $fullPath.Path + ".bak"
        if (-not (Test-Path $backup)) {
            Copy-Item $fullPath.Path $backup
        }
        Compress-ImageFile -InputPath $backup -OutputPath $fullPath.Path -MaxWidth 1400 -Quality 84L
    }
}

Write-Host "Image compression complete!"
