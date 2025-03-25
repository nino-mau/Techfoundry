<script setup>
// icons
import {
    TruckIcon,
    CreditCardIcon,
    ReceiptPercentIcon,
    ReceiptRefundIcon,
} from '@heroicons/vue/24/outline';
</script>

<template>
    <div
        class="bg-primary w-full h-full flex flex-row justify-between items-center pr-[136px] pl-[136px] text-white"
    >
        <div class="flex flex-col gap-2 max-w-[219px] text-inherit">
            <TruckIcon class="text-inherit w-[55px]" />
            <h1 class="text-[19px] font-bold text-inherit">Exceptional Service</h1>
            <p class="text-[12px] text-inherit">
                Proin ultices scelerisque que pretium mae purus accumsan nulla elementum
            </p>
        </div>
        <div class="flex flex-col gap-2 max-w-[219px] text-inherit">
            <CreditCardIcon class="text-inherit w-[55px]" />
            <h1 class="text-[19px] font-bold text-inherit">Exceptional Service</h1>
            <p class="text-[12px] text-inherit">
                Proin ultices scelerisque que pretium mae purus accumsan nulla elementum
            </p>
        </div>
        <div class="flex flex-col gap-2 max-w-[219px] text-inherit">
            <ReceiptPercentIcon class="text-inherit w-[55px]" />
            <h1 class="text-[19px] font-bold text-inherit">Exceptional Service</h1>
            <p class="text-[12px] text-inherit">
                Proin ultices scelerisque que pretium mae purus accumsan nulla elementum
            </p>
        </div>
        <div class="flex flex-col gap-2 max-w-[219px] text-inherit">
            <ReceiptRefundIcon class="text-inherit w-[55px]" />
            <h1 class="text-[19px] font-bold text-inherit">Exceptional Service</h1>
            <p class="text-[12px] text-inherit">
                Proin ultices scelerisque que pretium mae purus accumsan nulla elementum
            </p>
        </div>
    </div>
</template>

<style scoped></style>
