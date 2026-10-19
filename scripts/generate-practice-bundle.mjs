import fs from 'node:fs';
// ZIP store, UTF-8 filenames, deterministic timestamps; no external archiver.
const files=['MISSION.md','practice/__init__.py','practice/cifar10_mlp_tutorial.py','downloads/cifar10_mlp_tutorial.py','downloads/CIFAR10_MLP_逐步练习.ipynb'];
const entries=files.map(name=>({name,data:fs.readFileSync('public/'+name)}));
entries.push({name:'requirements.txt',data:Buffer.from('torch\ntorchvision\nmatplotlib\nnumpy\njupyterlab\n')});
entries.push({name:'开始运行.txt',data:Buffer.from('解压整个目录，不要只取出 ipynb。\n安装依赖：python -m pip install -r requirements.txt\n用当前 Python 环境启动 Jupyter，打开 downloads/CIFAR10_MLP_逐步练习.ipynb，从上到下运行。\n首次运行会下载 CIFAR-10，需要网络。QUICK_MODE=True 只核验流程，不能作为正式精度。\n也可运行：python downloads/cifar10_mlp_tutorial.py --help\n')});
function crc32(b){let c=0xffffffff;for(const v of b){c^=v;for(let j=0;j<8;j++)c=(c>>>1)^((c&1)?0xedb88320:0);}return (c^0xffffffff)>>>0;}
const chunks=[],central=[];let offset=0;
for(const {name,data}of entries){const n=Buffer.from(name),crc=crc32(data),h=Buffer.alloc(30);h.writeUInt32LE(0x04034b50);h.writeUInt16LE(20,4);h.writeUInt16LE(0x800,6);h.writeUInt16LE(33,12);h.writeUInt32LE(crc,14);h.writeUInt32LE(data.length,18);h.writeUInt32LE(data.length,22);h.writeUInt16LE(n.length,26);chunks.push(h,n,data);const c=Buffer.alloc(46);c.writeUInt32LE(0x02014b50);c.writeUInt16LE(20,4);c.writeUInt16LE(20,6);c.writeUInt16LE(0x800,8);c.writeUInt16LE(33,14);c.writeUInt32LE(crc,16);c.writeUInt32LE(data.length,20);c.writeUInt32LE(data.length,24);c.writeUInt16LE(n.length,28);c.writeUInt32LE(offset,42);central.push(c,n);offset+=h.length+n.length+data.length;}
const directory=Buffer.concat(central),end=Buffer.alloc(22);end.writeUInt32LE(0x06054b50);end.writeUInt16LE(entries.length,8);end.writeUInt16LE(entries.length,10);end.writeUInt32LE(directory.length,12);end.writeUInt32LE(offset,16);
fs.writeFileSync('public/downloads/CIFAR10_MLP_完整练习包.zip',Buffer.concat([...chunks,directory,end]));
console.log(`Practice bundle: ${entries.length} files`);
