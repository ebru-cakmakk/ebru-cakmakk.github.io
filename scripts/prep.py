import sys
from PIL import Image, ImageOps

# args: outdir, then pairs of  srcpath  outname  maxlongedge
outdir = sys.argv[1]
args = sys.argv[2:]

for i in range(0, len(args), 3):
    src, name, mx = args[i], args[i+1], int(args[i+2])
    im = Image.open(src)
    im = ImageOps.exif_transpose(im)
    im = im.convert("RGB")
    w, h = im.size
    scale = mx / max(w, h)
    if scale < 1:
        im = im.resize((round(w*scale), round(h*scale)), Image.LANCZOS)
    out = outdir + "/" + name
    im.save(out, "JPEG", quality=80, optimize=True, progressive=True)
    print(name, im.size, round(__import__("os").path.getsize(out)/1024), "KB")
