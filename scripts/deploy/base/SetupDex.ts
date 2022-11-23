import {Deploy} from "../Deploy";
import {ethers} from "hardhat";
import {Misc} from "../../Misc";
import {writeFileSync} from "fs";
import {MaticTestnetAddresses} from "../../addresses/MaticTestnetAddresses";

async function main() {
  const signer = (await ethers.getSigners())[0];

  const core = await Deploy.deployDex(signer, MaticTestnetAddresses.WMATIC_TOKEN)

  const data = ''
    + 'factory: ' + core[0].address + '\n'
    + 'router: ' + core[1].address + '\n'
    + 'treasury: ' + core[2].address + '\n'
    + 'library:' + core[3].address + '\n'

  console.log(data);
  writeFileSync('tmp/dex.txt', data);

  await Misc.wait(5);

  // await Verify.verify(core[2].address);
  // await Verify.verifyWithArgs(core[0].address, [core[2].address]);
  // await Verify.verifyWithArgs(core[1].address, [core[0].address, MaticAddresses.WMATIC_TOKEN]);

}

main()
  .then(() => process.exit(0))
  .catch(error => {
    console.error(error);
    process.exit(1);
  });
