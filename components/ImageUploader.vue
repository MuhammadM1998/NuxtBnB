<template>
  <div class="flex">
    <input
      type="file"
      accept="image/*"
      aria-label="Home Image Uploader"
      @change="uploadFile"
    />
  </div>
</template>

<script>
import { unWrap } from "~/utils/fetchUtils";
export default {
  methods: {
    async uploadFile(e) {
      const file = e.target.files[0];

      /* Make sure file exists */
      if (!file) return;

      /* Creating the cloudinary options object */
      const filename = file.name.split(".").slice(0, -1).join(".") + Date.now();
      const options = { timestamp: Date.now(), public_id: filename };

      /* Create a signature */
      const response = await unWrap(
        await fetch("/api/cloudinary/signature", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(options),
        })
      );
      const signature = response.data.signature;

      /* Create a reader */
      const readData = (fileObj) =>
        new Promise((resolve) => {
          const reader = new FileReader();
          reader.onloadend = () => resolve(reader.result);
          reader.readAsDataURL(fileObj);
        });
      const data = await readData(file);

      /* upload the converted data */
      const asset = await this.$cloudinary.upload(data, {
        ...options,
        apiKey: this.$config.cloudinary.apiKey,
        signature,
      });

      // Emit an event with the cloud image url
      this.$emit("imageUploaded", asset.public_id);
    },
  },
};
</script>
