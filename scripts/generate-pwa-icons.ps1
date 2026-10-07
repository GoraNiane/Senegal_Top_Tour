Add-Type -AssemblyName System.Drawing

$iconsDir = "frontend/public/icons"
if (-not (Test-Path $iconsDir)) {
    New-Item -ItemType Directory -Path $iconsDir -Force | Out-Null
}

function Create-PwaIcon {
    param(
        [int]$Size,
        [string]$Path,
        [bool]$IsMaskable = $false
    )

    $bmp = New-Object System.Drawing.Bitmap $Size, $Size
    $g = [System.Drawing.Graphics]::FromImage($bmp)
    $g.SmoothingMode = [System.Drawing.Drawing2D.SmoothingMode]::HighQuality
    $g.InterpolationMode = [System.Drawing.Drawing2D.InterpolationMode]::HighQualityBicubic
    $g.PixelOffsetMode = [System.Drawing.Drawing2D.PixelOffsetMode]::HighQuality

    # Background
    $bgBrush = New-Object System.Drawing.SolidBrush ([System.Drawing.ColorTranslator]::FromHtml("#151515"))
    $g.FillRectangle($bgBrush, 0, 0, $Size, $Size)

    # Outer decorative golden ring
    $goldPen = New-Object System.Drawing.Pen ([System.Drawing.ColorTranslator]::FromHtml("#C99A4A")), ([int]($Size * 0.025))
    $ringMargin = if ($IsMaskable) { [int]($Size * 0.15) } else { [int]($Size * 0.08) }
    $ringSize = $Size - ($ringMargin * 2)
    $g.DrawEllipse($goldPen, $ringMargin, $ringMargin, $ringSize, $ringSize)

    # Inner Dark Emerald Circle
    $emeraldBrush = New-Object System.Drawing.SolidBrush ([System.Drawing.ColorTranslator]::FromHtml("#173C32"))
    $innerMargin = $ringMargin + [int]($Size * 0.04)
    $innerSize = $Size - ($innerMargin * 2)
    $g.FillEllipse($emeraldBrush, $innerMargin, $innerMargin, $innerSize, $innerSize)

    # Golden Sun in Center
    $sunBrush = New-Object System.Drawing.SolidBrush ([System.Drawing.ColorTranslator]::FromHtml("#C99A4A"))
    $sunSize = [int]($Size * 0.28)
    $sunX = [int](($Size - $sunSize) / 2)
    $sunY = [int]($Size * 0.30)
    $g.FillEllipse($sunBrush, $sunX, $sunY, $sunSize, $sunSize)

    # Pirogue / Dune arc in bottom center
    $piroguePen = New-Object System.Drawing.Pen ([System.Drawing.ColorTranslator]::FromHtml("#F7F4EE")), ([int]($Size * 0.04))
    $piroguePen.StartCap = [System.Drawing.Drawing2D.LineCap]::Round
    $piroguePen.EndCap = [System.Drawing.Drawing2D.LineCap]::Round
    $pY = [int]($Size * 0.62)
    $pLeft = [int]($Size * 0.28)
    $pRight = [int]($Size * 0.72)
    $g.DrawArc($piroguePen, $pLeft, $pY - [int]($Size * 0.05), ($pRight - $pLeft), [int]($Size * 0.15), 0, 180)

    # Monogram "SENEGAL TOP TOUR"
    $fontSize = [float]($Size * 0.055)
    $font = New-Object System.Drawing.Font ("Arial", $fontSize, [System.Drawing.FontStyle]::Bold)
    $textBrush = New-Object System.Drawing.SolidBrush ([System.Drawing.ColorTranslator]::FromHtml("#C99A4A"))
    $format = New-Object System.Drawing.StringFormat
    $format.Alignment = [System.Drawing.StringAlignment]::Center
    $format.LineAlignment = [System.Drawing.StringAlignment]::Center
    $textRect = New-Object System.Drawing.RectangleF 0, ([int]($Size * 0.72)), $Size, ([int]($Size * 0.15))
    $g.DrawString("SENEGAL TOP TOUR", $font, $textBrush, $textRect, $format)

    $g.Dispose()
    $bmp.Save($Path, [System.Drawing.Imaging.ImageFormat]::Png)
    $bmp.Dispose()
    Write-Host "Created PWA Icon: $Path ($Size x $Size)"
}

Create-PwaIcon -Size 192 -Path "frontend/public/icons/icon-192x192.png"
Create-PwaIcon -Size 512 -Path "frontend/public/icons/icon-512x512.png"
Create-PwaIcon -Size 512 -Path "frontend/public/icons/icon-maskable-512x512.png" -IsMaskable $true
Create-PwaIcon -Size 180 -Path "frontend/public/icons/apple-touch-icon.png"

Write-Host "PWA icons created successfully!"
